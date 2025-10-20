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
import './index.less'

type BubbleDataType = {
  role: string;
  content: string;
};
console.log('env---', process.env.NODE_ENV)

const requestUrl = process.env.NODE_ENV === 'development' ? 'http://10.5.222.0:8080' : 'https://ai-product-j-1.zeabur.internal:8080'
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
      description: 'New AGI Hybrid Interface',
      icon: <span style={{ color: '#ff6565', fontWeight: 700 }}>2</span>,
    },
    {
      key: '1-3',
      description: 'What components are in Ant Design X?',
      icon: <span style={{ color: '#ff8f1f', fontWeight: 700 }}>3</span>,
    },
    {
      key: '1-4',
      description: 'Come and discover the new design paradigm of the AI era.',
      icon: <span style={{ color: '#00000040', fontWeight: 700 }}>4</span>,
    },
    {
      key: '1-5',
      description: 'How to quickly install and import components?',
      icon: <span style={{ color: '#00000040', fontWeight: 700 }}>5</span>,
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

  // ==================== State ====================
  const [messageHistory, setMessageHistory] = useState<Record<string, any>>({});

  const [attachmentsOpen, setAttachmentsOpen] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<GetProp<typeof Attachments, 'items'>>([]);

  const [inputValue, setInputValue] = useState('');

  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [isPolling, setIsPolling] = useState(false);
const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
const sessionIdRef = useRef<string | null>(null);

const timerRef = useRef<any>(null);

  /**
   * 🔔 Please replace the BASE_URL, PATH, MODEL, API_KEY with your own values.
   */

  // ==================== Runtime ====================
  // const [agent] = useXAgent<BubbleDataType>({
  //   baseURL: 'https://api.x.ant.design/api/llm_siliconflow_deepSeek-r1-distill-1wen-7b',
  //   model: 'DeepSeek-R1-Distill-Qwen-7B',
  //   dangerouslyApiKey: 'Bearer sk-xxxxxxxxxxxxxxxxxxxx',
  // });
  // const loading = agent.isRequesting();

  // const { onRequest, messages, setMessages } = useXChat({
  //   agent,
  //   requestFallback: (_, { error }) => {
  //     if (error.name === 'AbortError') {
  //       return {
  //         content: 'Request is aborted',
  //         role: 'assistant',
  //       };
  //     }
  //     return {
  //       content: 'Request failed, please try again!',
  //       role: 'assistant',
  //     };
  //   },
  //   transformMessage: (info) => {
  //     const { originMessage, chunk } = info || {};
  //     let currentContent = '';
  //     let currentThink = '';
  //     try {
  //       if (chunk?.data && !chunk?.data.includes('DONE')) {
  //         const message = JSON.parse(chunk?.data);
  //         currentThink = message?.choices?.[0]?.delta?.reasoning_content || '';
  //         currentContent = message?.choices?.[0]?.delta?.content || '';
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }

  //     let content = '';

  //     if (!originMessage?.content && currentThink) {
  //       content = `<think>${currentThink}`;
  //     } else if (
  //       originMessage?.content?.includes('<think>') &&
  //       !originMessage?.content.includes('</think>') &&
  //       currentContent
  //     ) {
  //       content = `${originMessage?.content}</think>${currentContent}`;
  //     } else {
  //       content = `${originMessage?.content || ''}${currentThink}${currentContent}`;
  //     }
  //     return {
  //       content: content,
  //       role: 'assistant',
  //     };
  //   },
  //   resolveAbortController: (controller) => {
  //     abortController.current = controller;
  //   },
  // });

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
                   setMessages(prev => [
                      ...prev.slice(0,prev.length-1),
                      {
                        key: (+ new Date()).toString(),
                        message: { role: 'thinking', content: event.data.trim(),  },
                      },
                      prev[prev.length - 1]
                    ])
                  if(event?.data?.includes('EXCEL文件生成，即将返回下载链接，请等待10-20秒')) {
                    console.log('EXCEL文件生成，即将返回下载链接，请等待10-20秒');
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
  if (isPolling) return;
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
          clearTimeout(timerRef.current);


          if (data.url) {
            setMessages(prev => [
              ...prev.slice(0,prev.length-1),
              {
                key: generateRandom6DigitString(),
                message: {
                  role: 'thinking',
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
  // ==================== Event ====================
  const onSubmit = (val: string) => {
    if (!val) return;

    if (loading) {
      message.error('正在生成中，请稍等！');
      return;
    }
    setLoading(true);

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

    // onRequest({
    //   stream: true,
    //   message: { role: 'user', content: val },
    // });
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
  useEffect(() => {
  return () => {
    setIsPolling(false);
  };
}, []);

  // ==================== Nodes ====================
  // const chatSider = (
  //   <div className={styles.sider}>
  //     {/* 🌟 Logo */}
  //     <div className={styles.logo}>
  //       <img
  //         src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*eco6RrQhxbMAAAAAAAAAAAAADgCCAQ/original"
  //         draggable={false}
  //         alt="logo"
  //         width={24}
  //         height={24}
  //       />
  //       <span>Ant Design X</span>
  //     </div>

  //     {/* 🌟 添加会话 */}
  //     <Button
  //       onClick={() => {
  //         if (agent.isRequesting()) {
  //           message.error(
  //             'Message is Requesting, you can create a new conversation after request done or abort it right now...',
  //           );
  //           return;
  //         }

  //         const now = dayjs().valueOf().toString();
  //         setConversations([
  //           {
  //             key: now,
  //             label: `New Conversation ${conversations.length + 1}`,
  //             group: 'Today',
  //           },
  //           ...conversations,
  //         ]);
  //         setCurConversation(now);
  //         setMessages([]);
  //       }}
  //       type="link"
  //       className={styles.addBtn}
  //       icon={<PlusOutlined />}
  //     >
  //       New Conversation
  //     </Button>

  //     {/* 🌟 会话管理 */}
  //     <Conversations
  //       items={conversations}
  //       className={styles.conversations}
  //       activeKey={curConversation}
  //       onActiveChange={async (val) => {
  //         abortController.current?.abort();
  //         // The abort execution will trigger an asynchronous requestFallback, which may lead to timing issues.
  //         // In future versions, the sessionId capability will be added to resolve this problem.
  //         setTimeout(() => {
  //           setCurConversation(val);
  //           setMessages(messageHistory?.[val] || []);
  //         }, 100);
  //       }}
  //       groupable
  //       styles={{ item: { padding: '0 8px' } }}
  //       menu={(conversation) => ({
  //         items: [
  //           {
  //             label: 'Rename',
  //             key: 'rename',
  //             icon: <EditOutlined />,
  //           },
  //           {
  //             label: 'Delete',
  //             key: 'delete',
  //             icon: <DeleteOutlined />,
  //             danger: true,
  //             onClick: () => {
  //               const newList = conversations.filter((item) => item.key !== conversation.key);
  //               const newKey = newList?.[0]?.key;
  //               setConversations(newList);
  //               // The delete operation modifies curConversation and triggers onActiveChange, so it needs to be executed with a delay to ensure it overrides correctly at the end.
  //               // This feature will be fixed in a future version.
  //               setTimeout(() => {
  //                 if (conversation.key === curConversation) {
  //                   setCurConversation(newKey);
  //                   setMessages(messageHistory?.[newKey] || []);
  //                 }
  //               }, 200);
  //             },
  //           },
  //         ],
  //       })}
  //     />

  //     <div className={styles.siderFooter}>
  //       <Avatar size={24} />
  //       <Button type="text" icon={<QuestionCircleOutlined />} />
  //     </div>
  //   </div>
  // );
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
          style={{ height: '100%', paddingInline: 'calc(calc(100% - 700px) /2)' }}
          roles={{
            assistant: {
              placement: 'start',
              footer: (
                <div style={{ display: 'flex' }}>
                  <Button type="text" size="small" icon={<ReloadOutlined />} />
                  <Button type="text" size="small" icon={<CopyOutlined />} />
                  <Button type="text" size="small" icon={<LikeOutlined />} />
                  <Button type="text" size="small" icon={<DislikeOutlined />} />
                </div>
              ),
              loadingRender: () => <Spin size="small" />,
              avatar: { icon: <UserOutlined />, style: { background: '#fde3cf' } },
            },
            user: { placement: 'end',avatar: { icon: <UserOutlined />, style: { background: '#87d068' } }, },
            thinking: {
              placement: 'start',
              variant:'borderless',
              className: 'thinkingBox',
              loadingRender: () => <Spin size="small" />,
              messageRender: (content) => <div className={styles.thinking}>{content}</div>
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
                  <Flex vertical gap="middle">
                      <Attachments.FileCard key={content.uid} item={content} />
                  </Flex>
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
          <Welcome
            variant="borderless"
            icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
            title="SheetTalk超级智能体"
            description="自动收集并高效处理海量数据"
             style={{
                backgroundImage: 'linear-gradient(97deg, #f2f9fe 0%, #f7f3ff 100%)',
                borderStartStartRadius: 4,
                padding: '10px 6px'
              }}
            // extra={
            //   <Space>
            //     <Button icon={<ShareAltOutlined />} />
            //     <Button icon={<EllipsisOutlined />} />
            //   </Space>
            // }
          />
          <Flex gap={16}>
            <Prompts
              items={[HOT_TOPICS]}
              styles={{
                list: { height: '100%' },
                item: {
                  flex: 1,
                  backgroundImage: 'linear-gradient(123deg, #e5f4ff 0%, #efe7ff 100%)',
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
            />
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
        onSubmit={() => {
          onSubmit(inputValue);
          setInputValue('');
        }}
        onChange={setInputValue}
        onCancel={() => {
          abortController.current?.abort();
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
          return (
            <Flex gap={4}>
              {/* <SpeechButton className={styles.speechButton} /> */}
              {loading ? <LoadingButton type="default" /> : <SendButton type="primary" />}
            </Flex>
          );
        }}
        placeholder="请输入需求"
      />
    </>
  );

  // useEffect(() => {
  //   // history mock
  //   if (messages?.length) {
  //     setMessageHistory((prev) => ({
  //       ...prev,
  //       [curConversation]: messages,
  //     }));
  //   }
  // }, [messages]);

  // ==================== Render =================
  return (
    <div className={styles.layout}>
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
