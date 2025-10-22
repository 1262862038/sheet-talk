import {
  AppstoreAddOutlined,
  CloudUploadOutlined,
  CommentOutlined,
  CopyOutlined,
  DeleteOutlined,
  DislikeOutlined,
  EditOutlined,
  EllipsisOutlined,
  FileSearchOutlined,
  HeartOutlined,
  LikeOutlined,
  PaperClipOutlined,
  PlusOutlined,
  ProductOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
  ScheduleOutlined,
  ShareAltOutlined,
  SmileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Attachments,
  Bubble,
  Conversations,
  Prompts,
  Sender,
  Welcome,
  useXAgent,
  useXChat,
} from '@ant-design/x';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { Avatar, Button, Flex, type GetProp, Space, Spin, message } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import useStyle from './style'
import { useTheme } from 'antd-style';

import './index.less'
import Header from '../../components/header';
import { useLocation } from 'react-router-dom';

type BubbleDataType = {
  role: string;
  content: string;
};

const requestUrl = process.env.NODE_ENV === 'development' ? 'http://10.5.222.0:8080' : 'https://sheet-talk-j.gaodun.com'
const DEFAULT_CONVERSATIONS_ITEMS = [
  {
    key: 'default-0',
    label: 'What is Ant Design X?',
    group: 'Today',
  },
  {
    key: 'default-1',
    label: 'How to quickly install and import components?',
    group: 'Today',
  },
  {
    key: 'default-2',
    label: 'New AGI Hybrid Interface',
    group: 'Yesterday',
  },
];

const HOT_TOPICS = {
  key: '1',
  label: '快捷提问',
  children: [
    {
      key: '1-1',
      description: '我要生成一个[个人所得税的Excel模板]，用于[计算每月个人所得税]，数据如下：[1月收入20000，2月收入30000，3月收入30000，4月收入40000，5月收入50000，6月收入60000，7月收入70000，8月收入80000，9月收入90000，10月收入100000，11月收入110000，12月收入120000]',
      icon: <span style={{ color: '#f93a4a', fontWeight: 700 }}>1</span>,
    },
    {
      key: '1-2',
      description: '我们公司企业在过去一年中推出了三款产品，并对部分原有产品进行了价格调整。现在他们想通过PVM分析了解今年总收入增长的主要驱动力是什么。 以下是一些关键数据:价格因素:去年A的平均售价为1.5元/瓶，今年调整为1.6元/瓶，去年销量为1200万瓶。B的价格保持不变，仍为2元/瓶。 销量因素:A今年销量减少至1000万瓶。B今年销量稳定在800万瓶。新推出的三款C、D、E，分别售出2000万瓶、1500万瓶和1000万瓶，定价分别为2.5元/瓶、2元瓶和1.8元/瓶。产品组合因素:新品C、D、E带来的收入增量，请帮忙生成PVM模型表格模板，Excel模版需要带公式。',
      icon: <span style={{ color: '#ff6565', fontWeight: 700 }}>2</span>,
    },
    {
      key: '1-3',
      description: '随机生成excel',
      icon: <span style={{ color: '#ff8f1f', fontWeight: 700 }}>3</span>,
    },

  ],
};

const DESIGN_GUIDE = {
  key: '2',
  label: '提问示例',
  children: [
    {
      key: '2-1',
      // icon: <HeartOutlined />,
      // label: 'Intention',
      description: '我要生成一个[个人所得税的Excel模板]，用于[计算每月个人所得税]，数据如下：[1月收入20000，2月收入30000，3月收入30000，4月收入40000，5月收入50000，6月收入60000，7月收入70000，8月收入80000，9月收入90000，10月收入100000，11月收入110000，12月收入120000]',
    },
    {
      key: '2-2',
      icon: <SmileOutlined />,
      label: 'Role',
      description: "生成excel",
    },
    {
      key: '2-3',
      icon: <CommentOutlined />,
      label: 'Chat',
      description: 'How AI Can Express Itself in a Way Users Understand',
    },
    {
      key: '2-4',
      icon: <PaperClipOutlined />,
      label: 'Interface',
      description: 'AI balances "chat" & "do" behaviors.',
    },
  ],
};

const SENDER_PROMPTS: GetProp<typeof Prompts, 'items'> = [
  {
    key: '1',
    description: 'Upgrades',
    icon: <ScheduleOutlined />,
  },
  {
    key: '2',
    description: 'Components',
    icon: <ProductOutlined />,
  },
  {
    key: '3',
    description: 'RICH Guide',
    icon: <FileSearchOutlined />,
  },
  {
    key: '4',
    description: 'Installation Introduction',
    icon: <AppstoreAddOutlined />,
  },
];



const Independent: React.FC = () => {
  const { styles } = useStyle();

  const abortController = useRef<AbortController>(null);

  const [attachmentsOpen, setAttachmentsOpen] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<GetProp<typeof Attachments, 'items'>>([]);

  const [inputValue, setInputValue] = useState('');

  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [isPolling, setIsPolling] = useState(false);
const sessionIdRef = useRef<string | null>(null);

const timerRef = useRef<any>(null);

const curContentRef = useRef<string | null>(null);

const theme = useTheme();

  const location = useLocation();

const generateRandom6DigitString = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
    const chat = async (message: string) => {
        abortController.current = new AbortController();
        sessionIdRef.current = generateRandom6DigitString()
        try {

            await fetchEventSource(`${requestUrl}/api/chat/completeStream`, {
                method: 'POST',
                headers: {
                    // 'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    Connection: 'keep-alive',
                    'Content-Type': 'application/json',
                },
                signal: abortController.current.signal,
                openWhenHidden: true,
                body: JSON.stringify({message,sessionId: sessionIdRef.current}),

                onopen(response) {
                    return Promise.resolve();
                },
                onmessage(event) {
                  console.log('event:', event);
                  if(!event?.data) return
                   setMessages(prev => {
                    const index = prev.findIndex(v => v.sessionId ===sessionIdRef.current && v?.message?.role === 'thinking');
                    if(index>= 0) {
                      curContentRef.current += event.data
                      return [
                        ...prev.slice(0,index),
                         {
                          key: generateRandom6DigitString(),
                          sessionId: sessionIdRef.current,
                          message: {
                            role: 'thinking',
                            content: prev[index]?.message?.content + event.data,
                          },
                        },
                        prev[prev.length - 1]
                      ];
                    }
                    return [
                      ...prev.slice(0,prev.length-1),
                      {
                        key: (+ new Date()).toString(),
                        sessionId: sessionIdRef.current,
                        message: { role: 'thinking', content: event.data.trim(),},
                      },
                      prev[prev.length - 1]
                    ]
                   })
                  if(curContentRef.current?.includes('EXCEL文件生成，即将返回下载链接，请等待10-20秒')) {
                      pollForUrl()
                    }

                },
                onerror(error) {
                    console.log('Error:', error);
                    abortController.current?.abort();

                    throw error; // 直接抛出错误，避免反复调用
                },
                onclose() {
                },
            });
        } catch (error) {
        }
    };
const pollForUrl = async () => {
  let maxRetries = 10;
  let retries = 0;
  if (isPolling ||timerRef.current) return;
  console.log('pollForUrl',isPolling);

  setIsPolling(true);
  timerRef.current = setTimeout(async() => {
    if(retries > maxRetries) {
       // 处理失败情况
            setMessages(prev => [
              ...prev.slice(0,prev.length-1),
               {
                key: generateRandom6DigitString(),
                message: {
                  role: 'thinking',
                  content: '文件生成失败，请重试！'
                },
              },
              {
                key: (+new Date()).toString(),
                message: {
                  role: 'file',
                  content: '文件生成失败，请重试'
                },
              }
            ]);
            clearTimeout(timerRef.current);
            timerRef.current = null
            return
    }
    retries += 1;
 try {
        // 替换为你的实际API端点
        const response = await fetch(`${requestUrl}/api/chat/read-file?sessionId=${sessionIdRef.current}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Data:', data);


          if (data.url) {
          clearTimeout(timerRef.current);
          timerRef.current = null
            setMessages(prev => [
              ...prev.slice(0,prev.length-1),
              {
                key: generateRandom6DigitString(),
                message: {
                  role: 'assistant',
                  content: '文件生成成功，请点击下方文件下载。'
                },
              },
              {
                key: generateRandom6DigitString(),
                message: {
                  role: 'file',
                  content: {
                    uid: '1',
                    name: data.name,
                     url: data.url,
                  }
                },
              }
            ]);
          setLoading(false);


          } else if (data.status === 'failed') {
            // 处理失败情况
            setMessages(prev => [
              ...prev.slice(0,prev.length-1),
               {
                key: generateRandom6DigitString(),
                message: {
                  role: 'thinking',
                  content: '文件生成失败，请重试！'
                },
              },
              {
                key: (+new Date()).toString(),
                message: {
                  role: 'file',
                  content: '文件生成失败，请重试'
                },
              }
            ]);
          setLoading(false);
          }
          // 如果还在处理中，继续轮询
        }
      } catch (error) {
        console.error('Polling error:', error);

      } finally {
          setIsPolling(false);

  }

  }, 2000);

};
  const onSubmit = (val: string) => {
    if (!val) return;

    if (loading) {
      message.error('正在生成中，请稍等！');
      return;
    }
    setLoading(true);
    sessionIdRef.current = null
    curContentRef.current = ''
    setMessages(prev => [
      ...prev,
      {
        key: '1',
        message: { role: 'user', content: val,  },
      },
       {
        key: '2',
        message: { role: 'loading', content: '正在生成中，请稍等！',  },
      },
    ])
    chat(val)
  };

  const add  = () => {
    setLoading(true);
      setMessages(prev => [
      ...prev,
      {
        key: +new Date(),
        message: { role: 'thinking', content: '正在生成中，请稍等！' },
      },
    ])
  }
    const downloadExcelByUrl = async (url: string, fileName = '文件下载.xlsx') => {
      // window.open(url, '_blank');
      // return
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('文件下载失败');

        // 从响应头获取文件名（优先于服务器配置）
        const contentDisposition = response.headers.get('Content-Disposition');
        if (contentDisposition) {
            const match = contentDisposition.match(/filename="?([^";]+)"?/);
            if (match && match[1]) {
                fileName = decodeURIComponent(match[1]); // 解码可能的URL编码文件名
            }
        }

        // 将响应转为Blob（二进制对象）
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);

        // 创建a标签下载
        const link = document.createElement('a');
        link.href = objectUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();

        // 清理资源
        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(objectUrl); // 释放内存
        }, 0);
    } catch (error) {
        console.error('下载失败:', error);
    }
}
//  useEffect(() => {
//     // 获取从首页传递过来的参数
//     if (location.state && (location.state as any).prompt) {
//       const prompt = (location.state as any).prompt;
//         // console.log('dafaf',prompt)
//       onSubmit(prompt);
//       location.state = ''
//     }
//   }, [location.state]);
  useEffect(() => {
    const prompt = localStorage.getItem('prompt');
    if(prompt) {
      onSubmit(prompt);
      localStorage.removeItem('prompt');

    }
  return () => {
    setIsPolling(false);
  };
}, []);

  const chatList = (
    <div className={styles.chatList}>
      {messages?.length ? (
        /* 🌟 消息列表 */
        <Bubble.List
          items={messages?.map((i) => ({
            ...i.message,
            classNames: {
              content: i.status === 'loading' ? styles.loadingMessage : '',
            },
            typing: i.status === 'loading' ? { step: 5, interval: 20, suffix: <>💗</> } : false,
          }))}
          style={{ height: '100%', paddingInline: 'calc(calc(100% - 700px) /2)'}}
          roles={{
            assistant: {
              placement: 'start',
              // footer: (
              //   <div style={{ display: 'flex' }}>
              //     <Button type="text" size="small" icon={<ReloadOutlined />} />
              //     <Button type="text" size="small" icon={<CopyOutlined />} />
              //     <Button type="text" size="small" icon={<LikeOutlined />} />
              //     <Button type="text" size="small" icon={<DislikeOutlined />} />
              //   </div>
              // ),
              loadingRender: () => <Spin size="small" />,
              // avatar: { icon: <UserOutlined />, style: { background: '#fde3cf' } },
            },
            user: { placement: 'end',
              // avatar: { icon: <UserOutlined />, style: { background: '#87d068' } },
            },
            thinking: {
              placement: 'start',
              variant:'borderless',
              className: 'thinkingBox',
              loadingRender: () => <Spin size="small" />,
              messageRender: (content) => <div className={styles.thinking} dangerouslySetInnerHTML={{__html: content}}></div>
            },
            loading: {
              placement: 'start',
              variant:'borderless',
              className: 'loadingBox',
              messageRender: (content) => <div >{content}</div>
            },
             file: {
                placement: 'start',
                variant: 'borderless',
                messageRender: (content) => (
                  // <Flex vertical gap="middle">
                  //     <Attachments.FileCard key={content.uid} item={content} />
                  // </Flex>
                  <div className={"excelSucess"}>
                <div className={"left"}>
                    <div className={"iconName"}>
                        <div className={"icon"}>
                            <img src="https://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/202509/10/64059_20250910180216.png" alt="" />
                        </div>
                        <div className={"nameSize"}>
                                <div className={"name"}>{decodeURIComponent(content?.name)}</div>
                            <div className={"type"}>{""}</div>
                        </div>
                    </div>

                </div>
                <div className={"right"} onClick={() => downloadExcelByUrl(content.url, decodeURIComponent(content.name))}>
                    <span className={"text"}>下载</span>
                      <img className='download-img' src="https://simg01.gaodunwangxiao.com/uploadfiles/tmp/upload/202509/15/c61c4_20250915193545.png" alt="" />
                </div>
            </div>
                ),
              },
          }}
        />
      ) : (
        <Space
          direction="vertical"
          size={16}
          style={{ paddingInline: 'calc(calc(100% - 700px) /2)' }}
          className={styles.placeholder}
        >
          <div className={styles.introWrap}>
            <div className={'tag'}>SheetTalk超级智能体</div>
            <div className={'desc'}>调用海量工具完成各种任务</div>
          </div>
          <Flex gap={16}>
            <Prompts
              items={[HOT_TOPICS]}
              styles={{
                list: { height: '100%' },
                item: {
                  flex: 1,
                  color: theme.colorText,
                  backgroundImage: theme.promptBg,
                  borderRadius: 12,
                  border: 'none',
                },
                subItem: { padding: 0, background: 'transparent' },
              }}
              onItemClick={(info) => {
                onSubmit(info.data.description as string);
              }}
              className={styles.chatPrompt}
            />
{/*
            <Prompts
              items={[DESIGN_GUIDE]}
              styles={{
                item: {
                  flex: 1,
                  backgroundImage: 'linear-gradient(123deg, #e5f4ff 0%, #efe7ff 100%)',
                  borderRadius: 12,
                  border: 'none',
                },
                subItem: { background: '#ffffffa6' },
              }}
              onItemClick={(info) => {
                onSubmit(info.data.description as string);
              }}
              className={styles.chatPrompt}
            /> */}
          </Flex>
        </Space>
      )}
    </div>
  );
  const senderHeader = (
    <Sender.Header
      title="Upload File"
      open={attachmentsOpen}
      onOpenChange={setAttachmentsOpen}
      styles={{ content: { padding: 0 } }}
    >
      <Attachments
        beforeUpload={() => false}
        items={attachedFiles}
        onChange={(info) => setAttachedFiles(info.fileList)}
        placeholder={(type) =>
          type === 'drop'
            ? { title: 'Drop file here' }
            : {
                icon: <CloudUploadOutlined />,
                title: 'Upload files',
                description: 'Click or drag files to this area to upload',
              }
        }
      />
    </Sender.Header>
  );
  const chatSender = (
    <>
      {/* 🌟 提示词 */}
      {/* <Prompts
        items={SENDER_PROMPTS}
        onItemClick={(info) => {
          onSubmit(info.data.description as string);
        }}
        styles={{
          item: { padding: '6px 12px' },
        }}
        className={styles.senderPrompt}
      /> */}
      {/* 🌟 输入框 */}
      <Sender
        value={inputValue}
        // header={senderHeader}
        // prefix={<div className={'a'}>dada</div>}
        onSubmit={() => {
          onSubmit(inputValue);
          setInputValue('');
        }}
        onChange={setInputValue}
        onCancel={() => {
          abortController.current?.abort();
          setLoading(false);
          const loadingIndex = messages.findIndex((item) => item.message.role === 'loading');
          setMessages(messages.slice(0, loadingIndex))
        }}
        // prefix={
        //   <Button
        //     type="text"
        //     icon={<PaperClipOutlined style={{ fontSize: 18 }} />}
        //     onClick={() => setAttachmentsOpen(!attachmentsOpen)}
        //   />
        // }
        loading={loading}
        className={styles.sender}
        // allowSpeech
        actions={(_, info) => {
          const { SendButton, LoadingButton, SpeechButton } = info.components;
          console.log(info);
          return (
            <Flex gap={4}>
              {/* <SpeechButton className={styles.speechButton} /> */}
              {/* {loading ? <LoadingButton type="default" /> : <SendButton type="primary" />} */}
              {loading ? <LoadingButton type="default" /> : <div onClick={() => {
                 onSubmit(inputValue);
                  setInputValue('');
              }} className={styles.sendButton}><img src="https://simg01.gaodunwangxiao.com/uploadfiles/tmp/upload/202510/21/96be1_20251021170937.png" alt="" /></div>}

            </Flex>
          );
        }}
        placeholder="请输入需求"
      />
    </>
  );
  return (
    <div className={styles.layout}>
      {/* <Header styles={styles}/> */}
      <Header simple={true}/>
      {/* {chatSider} */}
      {/* <button onClick={add}>添加</button> */}

      <div className={styles.chat}>
        {chatList}
        {chatSender}
      </div>
    </div>
  );
};

export default Independent;
