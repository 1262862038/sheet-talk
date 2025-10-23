import { Avatar, Button, Flex, type GetProp, Space, Spin, message } from 'antd';
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
export const requestUrl = process.env.NODE_ENV === 'development' ? 'http://10.5.223.26:8080' : 'https://sheet-talk-j.gaodun.com'
export const DEFAULT_CONVERSATIONS_ITEMS = [
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

export const HOT_TOPICS = {
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

export const DESIGN_GUIDE = {
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

export const SENDER_PROMPTS: GetProp<typeof Prompts, 'items'> = [
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


  export const downloadExcelByUrl = async (url: string, name?: string) => {
        let fileName = name || '文件下载.xlsx'
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

export const loadingTextFind = "<img src='https://simg01.gaodunwangxiao.com/uploadfiles/tmp/upload/202509/07/0a0fa_20250907093927.gif'"
export const loadingText = "<img src='https://simg01.gaodunwangxiao.com/uploadfiles/tmp/upload/202509/07/0a0fa_20250907093927.gif' style={{width: '16px', height: '16px'}}/>"

