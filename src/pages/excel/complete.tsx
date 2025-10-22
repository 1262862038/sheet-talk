import { CheckOutlined, DownloadOutlined } from '@ant-design/icons'
import { Button, Card, Typography } from 'antd'

const Complete = ({url,name}: {url: string;name: string}) => {
      const downloadExcelByUrl = async () => {
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
  return (
     <Card className="complete-card">
            <div className="complete-title">
              <CheckOutlined className="complete-icon" />
              <Typography.Title level={4} className="title-text">Excel文件生成完成</Typography.Title>
            </div>

            <Typography.Text className="complete-message">
              您的Excel文件已成功生成，可以点击下方按钮下载。
            </Typography.Text>

            <Button
              icon={<DownloadOutlined />}
              className="download-btn"
              onClick={() =>downloadExcelByUrl()}
            >
              下载文件
            </Button>
          </Card>
  )
}

export default Complete
