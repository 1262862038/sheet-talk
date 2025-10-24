import { createStyles } from 'antd-style';

const useStyle = createStyles(({ token, css }: any) => {
  return {
    header: css`
      background: ${token.headerBg};
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      box-sizing: border-box;
      .logo {
        display: flex;
        align-items: center;
          img {
            height: 58px;
            width: 58px;
          }
      }
      .title {
        font-size: 20px;
        color: ${token.colorText};
      }
    `,

    introWrap: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      color: ${token.colorText};
      .tag {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 28px;
            border-radius: 6px;
            padding: 0 12px;
            font-size: 14px
            font-weight: 500;
            border: 1px solid ${token.colorBorderSecondary};
      }
      .desc {
        margin-top: 12px;
        height: 45px;
        font-size: 32px;
        font-style: normal;
        font-weight: 400;
      }
    `,
    layout: css`
      width: 100%;
      min-width: 1000px;
      height: 100vh;
      display: flex;
      flex-direction: column;
      background: ${token.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${token.fontFamily}, sans-serif;
    `,
    // sider 样式
    sider: css`
      background: ${token.colorBgLayout}80;
      width: 280px;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 12px;
      box-sizing: border-box;
    `,
    logo: css`
      display: flex;
      align-items: center;
      justify-content: start;
      padding: 0 24px;
      box-sizing: border-box;
      gap: 8px;
      margin: 24px 0;

      span {
        font-weight: bold;
        color: ${token.colorText};
        font-size: 16px;
      }
    `,
    addBtn: css`
      background: #1677ff0f;
      border: 1px solid #1677ff34;
      height: 40px;
    `,
    conversations: css`
      flex: 1;
      overflow-y: auto;
      margin-top: 12px;
      padding: 0;

      .ant-conversations-list {
        padding-inline-start: 0;
      }
    `,
    siderFooter: css`
      border-top: 1px solid ${token.colorBorderSecondary};
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `,
    // chat list 样式
    chat: css`
      height: calc(100% - 64px);
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding-block: ${token.paddingLG}px;
      gap: 16px;
    `,
    chatPrompt: css`
      .ant-prompts-label {
        /* color: #000000e0 !important; */
      }
      .ant-prompts-desc {
        /* color: #000000a6 !important; */
        width: 100%;
      }
      .ant-prompts-icon {
        /* color: #000000a6 !important; */
      }
    `,
    chatList: css`
      flex: 1;
      overflow: auto;
    `,
    loadingMessage: css`
      background-image: linear-gradient(90deg, #ff6b23 0%, #af3cb8 31%, #53b6ff 89%);
      background-size: 100% 2px;
      background-repeat: no-repeat;
      background-position: bottom;
    `,
    placeholder: css`
      padding-top: 32px;
    `,
    // sender 样式
    sender: css`
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      background: ${token.sendBg};
      border-color: ${token.sendBorderColor};
    `,
    speechButton: css`
      font-size: 18px;
      color: ${token.colorText} !important;
    `,
    senderPrompt: css`
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      color: ${token.colorText};
    `,
    thinkingBox: css`
      padding: 10px 0;
    `,
    thinkWrap: css`
      display: flex;
      /* align-items: flex-start; */
    `,
    thinking: css`
      color: #9aa7b7;
      font-size: 14px;
      margin-right: 30px;
      width: 320px;
      background: #1e1e1e;
      border-radius: 8px;
      padding: 20px 0;
      position: relative;
      .thinkingInner {
        overflow-y: auto;
        height: 340px;
        padding: 0 20px;
        color: #ffffffcc;

      }
      .thinkingLoading {
        position: absolute;
        bottom: 10px;
        right: 10px;
      }
    `,
    sendButton: css`
      display: flex;
      align-items: center;
      justify-content: center;
      height: 36px;
      width: 36px;
      border-radius: 12px;
      background: #172d4d;
      cursor: pointer;
      /* border-color: ${token.sendBorderColor}; */
      img {
        width: 16px;
        height: 16px;
      }
    `,
  };

});

export default useStyle;
