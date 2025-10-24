import { CloudUploadOutlined, LoadingOutlined } from '@ant-design/icons';
import {
  Attachments,
  Bubble,
  Prompts,
  Sender,
  Welcome,
} from '@ant-design/x';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { Avatar, Button, Flex, type GetProp, Space, Spin, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import useStyle from './style'
import { useTheme } from 'antd-style';

import './index.less'
import Header from '../../components/header';
import Excel from '../excel'
import Complete from '../excel/complete';
import {requestUrl, HOT_TOPICS,DEFAULT_CONVERSATIONS_ITEMS,DESIGN_GUIDE,SENDER_PROMPTS,downloadExcelByUrl,loadingText, loadingTextFind  } from './contant'


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
const thinkingRef = useRef<any>(null);
const conuterRef = useRef<number>(0); // 当前计时
const conutTimerRef = useRef<any>(0); // 当前计时

const clearCounter = () => {
  if (conutTimerRef.current) {
    clearInterval(conutTimerRef.current);
    conutTimerRef.current = null;
    conuterRef.current = 0
  }
};
const generateRandom6DigitString = () => {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
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
                   conutTimerRef.current = setInterval(() => {
                     conuterRef.current += 1
                  }, 1000);
                    return Promise.resolve();
                },
                onmessage(event) {
                  console.log('event:', event);
                  // if(!event?.data) return
                  if(event?.data === '访问受限') {
                    accessLimit()
                    return
                  }

                   setMessages(prev => {
                    const index = prev.findIndex(v => v.sessionId ===sessionIdRef.current && v?.message?.role === 'thinking');
                    const loadingIndex =  prev[index]?.message?.content.indexOf(loadingTextFind)
                    if(index>= 0) {
                      curContentRef.current += event.data

                      return [
                        ...prev.slice(0,index),
                         {
                          key: generateRandom6DigitString(),
                          sessionId: sessionIdRef.current,
                          message: {
                            // percentage: (((prev[index]?.message?.percentage) || 0) + 5) >=100 ? 99 : (((prev[index].message?.percentage) || 0) + 1),
                            percentage: conuterRef.current >=90 ? 90 : conuterRef.current,
                            role: 'thinking',
                            content: prev[index]?.message?.content + event.data.trim(),
                            status:0
                            // content: loadingIndex > 0 ? prev[index]?.message?.content.slice(0,loadingIndex) + event.data + loadingText : prev[index]?.message?.content + event.data + loadingText,

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
                        message: {percentage: 0, role: 'thinking', content: event.data.trim(),status: 0},
                      },
                      prev[prev.length - 1]
                    ]
                   })
                  if(curContentRef.current?.includes('EXCEL文件生成，即将返回下载链接，请等待10-20秒')) {
                      pollForUrl()
                    }
                    scrollToBottomPrecise()

                },
                onerror(error) {
                    console.log('Error:', error);
                    abortController.current?.abort();

                    throw error; // 直接抛出错误，避免反复调用
                },
                onclose() {
                  clearCounter()
                },
            });
        } catch (error) {
        }
    };


    // 访问次数用完
    const accessLimit = () => {

            setMessages(prev => {
              const newMsgs = [
              ...prev.slice(0,prev.length-1),
               {
                key: generateRandom6DigitString(),
                message: {
                  role: 'assistant',
                  content: '访问次数用完！'
                },
              },
            ]
            return newMsgs
            })

            setLoading(false);

    }
      // 文件生成失败
      const fail = () => {
            setMessages(prev => {
              const newMsgs = [
              ...prev.slice(0,prev.length-1),
               {
                key: generateRandom6DigitString(),
                message: {
                  role: 'assistant',
                  content: '文件生成失败，请重试！'
                },
              },
            ]
            return newMsgs.map(v => {
                if(v.sessionId === sessionIdRef.current && v?.message?.role === 'thinking') {
                  return {
                    ...v,
                    message: {
                      ...v.message,
                      status: 2
                    },
                  };
                }
                return v
              })
            })
            clearInterval(timerRef.current);
            timerRef.current = null
          setLoading(false);

        }
const pollForUrl = async () => {
  let maxRetries = 10;
  let retries = 0;
  // const curThinkIndex = messages.findIndex(v => v.sessionId ===sessionIdRef.current && v?.message?.role === 'thinking');
  // console.log('curThinkIndex',curThinkIndex, messages,sessionIdRef.current)
  if (isPolling ||timerRef.current) return;
  setIsPolling(true);
  timerRef.current = setInterval(async() => {
    if(retries > maxRetries) {
            fail()
            return
    }
    retries += 1;
    try {
        const response = await fetch(`${requestUrl}/api/chat/read-file?sessionId=${sessionIdRef.current}`, {
        // const response = await fetch(`${requestUrl}/api/chat/read-file?sessionId=123`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.status === 1) {
          clearInterval(timerRef.current);
          timerRef.current = null
            setMessages(prev => {
              const newMsgs = [
              ...prev.slice(0,prev.length-1),
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
            ]
              return newMsgs.map(v => {
                if(v.sessionId === sessionIdRef.current && v?.message?.role === 'thinking') {
                  return {
                    ...v,
                    message: {
                      ...v.message,
                      percentage: 100,
                      status: 1
                    },
                  };
                }
                return v
              })
            });
          setLoading(false);
          } else if (data.status === 2) {
            // 处理失败情况
            fail()
          }
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
        key: '2',
        message: { role: 'thinking', content: '21413' },
      },
      {
        key: '1',
        message: { role: 'loading', content: '正在生成中，请稍等！' },
      },
    ])
    pollForUrl()
  }
  // 滚动到thinkingBox底部的方法
const scrollToBottomPrecise = () => {
  if (thinkingRef.current) {
    console.log('thinkingRef.current.scrollHeight',thinkingRef.current.scrollHeight)
    thinkingRef.current.scrollTop = thinkingRef.current.scrollHeight;
  }
};
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
          roles={(bubble: any, index) => {
            switch (bubble.role) {
              case 'assistant':
                return {
                  placement: 'start',
                  loadingRender: () => <Spin size="small" />,
                }
                case 'user':
                return {
                  placement: 'end',
                };
                case 'thinking':
                return {
                   placement: 'start',
                    variant:'borderless',
                    className: 'thinkingBox',
                    loadingRender: () => <Spin size="small" />,
                    messageRender: (content) => <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8'>

                      <div className={styles.thinking} >
                        <div className={'thinkingInner scrollBar'} ref={thinkingRef} dangerouslySetInnerHTML={{__html: content}}></div>
                         {!bubble.isCancelled && bubble.status === 0 && <div className='thinkingLoading'><LoadingOutlined /></div>}
                      </div>
                      <Excel currentPercentage={bubble.percentage} isCancelled={bubble.isCancelled} status={bubble.status}/>
                    </div>
                };
                case 'loading':
                  return {
                      placement: 'start',
                      variant:'borderless',
                      messageRender: (content) => <div></div>
                  }
                case 'file':
                  return {
                       placement: 'start',
                variant: 'borderless',
                messageRender: (content) => (

                  <div className={"excelSucess"}>
                      <div className={"left"}>
                          <div className={"iconName"}>
                              <div className={"icon"}>
                                  <img src="https://simg01.gaodunwangxiao.com/uploadimgs/tmp/upload/202509/10/64059_20250910180216.png" alt="" />
                              </div>
                              <div className={"nameSize"}>
                                      <div className={"name"}>{decodeURIComponent(content?.name)}</div>
                              </div>
                          </div>

                      </div>
                      <div className={"right"} onClick={() => downloadExcelByUrl(content.url, decodeURIComponent(content.name))}>
                          <span className={"text"}>下载</span>
                            <img className='download-img' src="https://simg01.gaodunwangxiao.com/uploadfiles/tmp/upload/202509/15/c61c4_20250915193545.png" alt="" />
                      </div>
                  </div>
                  // <Complete url={content.url} name={decodeURIComponent(content.name)} />
                  // <Excel />
                ),
                  }

              default:
                return {
                  placement: 'start',
                };
            }
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
            <div className={'desc'}>告别手动制表，步入自动Excel生成时代</div>
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
        classNames={{
          content: 'sender-content'
        }}
        onSubmit={() => {
          onSubmit(inputValue);
          setInputValue('');
        }}
        onChange={setInputValue}
        onCancel={() => {
          abortController.current?.abort();
          clearCounter()
          setLoading(false);
          const loadingIndex = messages.findIndex((item) => item.message.role === 'loading');
          const thinkingIndex = messages.findIndex((item) => item.sessionId === sessionIdRef.current);
          const newMessages = messages.slice(0, loadingIndex);
          newMessages[thinkingIndex].message.isCancelled = true;
          setMessages(newMessages)
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
        // disabled={loading}
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
      <Header simple={true}/>
      {/* {chatSider} */}
      {/* <button onClick={add} style={{color: 'red'}}>添加</button> */}

      <div className={styles.chat}>
        {chatList}
        {chatSender}
      </div>
    </div>
  );
};

export default Independent;
