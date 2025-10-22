import React, { useState, useEffect, useRef } from 'react';
import { Progress, Card, Button, Typography, Space, Table, Tag, Spin, Alert } from 'antd';
import {
  ExcelOutlined,
  LoadingOutlined,
  CheckOutlined,
  CloseOutlined,
  DownloadOutlined,
  DatabaseOutlined,
  FileExcelOutlined,
  LineChartOutlined,
  BorderOutlined
} from '@ant-design/icons';
import 'antd/dist/reset.css';
import { css } from 'antd-style';

// 自定义样式
const styles = {
  container: css`
    min-height: 100vh;
    background-color: #121212;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
  `,
  card: css`
    background-color: #121212;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    border: none;
    width: 100%;
    max-width: 500px;
  `,
  title: css`
    color: #fff;
    font-weight: 300;
    text-align: center;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  excelIcon: css`
    margin-right: 10px;
    filter: invert(1);
  `,
  progressContainer: css`
    margin-bottom: 20px;
  `,
  progressText: css`
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  `,
  statusContainer: css`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  `,
  statusIcon: css`
    margin-right: 10px;
  `,
  statusText: css`
    color: #fff;
    font-weight: 300;
  `,
  subStatusText: css`
    color: #aaa;
    font-size: 12px;
  `,
  visualizationContainer: css`
    background-color: #1e1e1e;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
  `,
  visualizationTitle: css`
    color: #aaa;
    font-size: 14px;
    margin-bottom: 10px;
    font-weight: 300;
  `,
  dataCells: css`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 5px;
  `,
  dataCell: css`
    height: 8px;
    background-color: #2d2d2d;
    border-radius: 4px;
    transition: all 0.3s ease;
  `,
  dataCellActive: css`
    background-color: #3b82f6;
    transform: scale(1.05);
  `,
  excelTable: css`
    background-color: #1e1e1e;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 20px;
  `,
  tableHeader: css`
    background-color: #2d2d2d;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #3d3d3d;
  `,
  sheetName: css`
    color: #aaa;
    font-size: 12px;
    margin-right: 10px;
  `,
  windowControls: css`
    display: flex;
    gap: 5px;
  `,
  controlButton: css`
    width: 12px;
    height: 12px;
    border-radius: 50%;
  `,
  tableContainer: css`
    padding: 10px;
  `,
  antTable: css`
    background-color: transparent;
    border: none;
  `,
  antTableHeader: css`
    background-color: #2d2d2d;
    border: none;
  `,
  antTableHeaderCell: css`
    color: #aaa;
    font-weight: 300;
    font-size: 12px;
    background-color: #2d2d2d;
    border: 1px solid #3d3d3d;
  `,
  antTableCell: css`
    color: #ddd;
    font-size: 12px;
    border: 1px solid #3d3d3d;
    transition: all 0.3s ease;
  `,
  antTableCellFilled: css`
    background-color: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
  `,
  buttonContainer: css`
    display: flex;
    justify-content: flex-end;
  `,
  cancelButton: css`
    background-color: #2d2d2d;
    color: #aaa;
    border: none;
    &:hover {
      background-color: #3d3d3d;
      color: #fff;
    }
  `,
  completeCard: css`
    background-color: #121212;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    border: none;
    width: 100%;
    max-width: 500px;
    margin-top: 20px;
  `,
  completeTitle: css`
    color: #fff;
    font-weight: 300;
    text-align: center;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  completeIcon: css`
    margin-right: 10px;
    color: #10b981;
  `,
  completeMessage: css`
    color: #aaa;
    text-align: center;
    margin-bottom: 20px;
  `,
  downloadButton: css`
    background-color: #3b82f6;
    color: #fff;
    border: none;
    &:hover {
      background-color: #2563eb;
    }
  `,
  typingCursor: css`
    border-right: 2px solid #3b82f6;
    animation: blink 1s infinite;
  `,
  @keyframes blink: css`
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  `,
  mouseFollowContainer: css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1000;
  `,
  mouseDot: css`
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: #3b82f6;
    border-radius: 50%;
    opacity: 0;
    transition: all 0.5s ease;
  `
};

// 生成状态和进度数据
const generationStates = [
  { id: 1, name: '准备数据', subname: '初始化生成环境', percentage: 10, icon: <DatabaseOutlined /> },
  { id: 2, name: '收集数据', subname: '从数据库获取数据', percentage: 25, icon: <DatabaseOutlined /> },
  { id: 3, name: '处理数据', subname: '清洗和转换数据', percentage: 45, icon: <FileExcelOutlined /> },
  { id: 4, name: '应用格式', subname: '设置单元格格式和样式', percentage: 65, icon: <BorderOutlined /> },
  { id: 5, name: '生成图表', subname: '创建数据可视化图表', percentage: 80, icon: <LineChartOutlined /> },
  { id: 6, name: '完成', subname: '文件生成完成', percentage: 100, icon: <CheckOutlined /> }
];

// Excel表格列定义
const columns = [
  { title: 'A', dataIndex: 'a', key: 'a', width: '20%' },
  { title: 'B', dataIndex: 'b', key: 'b', width: '20%' },
  { title: 'C', dataIndex: 'c', key: 'c', width: '20%' },
  { title: 'D', dataIndex: 'd', key: 'd', width: '20%' },
  { title: 'E', dataIndex: 'e', key: 'e', width: '20%' }
];

// 初始化表格数据
const initialTableData = [
  { key: '1', a: '', b: '', c: '', d: '', e: '' },
  { key: '2', a: '', b: '', c: '', d: '', e: '' },
  { key: '3', a: '', b: '', c: '', d: '', e: '' },
  { key: '4', a: '', b: '', c: '', d: '', e: '' },
  { key: '5', a: '', b: '', c: '', d: '', e: '' }
];

const App = () => {
  const [currentStateIndex, setCurrentStateIndex] = useState(0);
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [tableData, setTableData] = useState(initialTableData);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [activeCells, setActiveCells] = useState(0);
  const [displayedStatus, setDisplayedStatus] = useState('');
  const [displayedSubStatus, setDisplayedSubStatus] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [subCharIndex, setSubCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubDeleting, setIsSubDeleting] = useState(false);

  const generationInterval = useRef(null);
  const typingInterval = useRef(null);
  const subTypingInterval = useRef(null);
  const mouseFollowContainer = useRef(null);
  const lastMousePosition = useRef({ x: 0, y: 0 });

  // 初始化进度
  useEffect(() => {
    startGeneration();
    initMouseFollowEffect();

    return () => {
      if (generationInterval.current) clearInterval(generationInterval.current);
      if (typingInterval.current) clearInterval(typingInterval.current);
      if (subTypingInterval.current) clearInterval(subTypingInterval.current);
    };
  }, []);

  // 更新打字效果
  useEffect(() => {
    const currentState = generationStates[currentStateIndex];

    // 清除之前的定时器
    if (typingInterval.current) clearInterval(typingInterval.current);
    if (subTypingInterval.current) clearInterval(subTypingInterval.current);

    // 重置打字状态
    setDisplayedStatus('');
    setDisplayedSubStatus('');
    setCharIndex(0);
    setSubCharIndex(0);
    setIsDeleting(false);
    setIsSubDeleting(false);

    // 开始打字动画
    typingInterval.current = setInterval(() => {
      typeText(currentState.name, setDisplayedStatus, charIndex, setCharIndex, isDeleting, setIsDeleting);
    }, 50);

    subTypingInterval.current = setInterval(() => {
      typeText(currentState.subname, setDisplayedSubStatus, subCharIndex, setSubCharIndex, isSubDeleting, setIsSubDeleting);
    }, 30);

    return () => {
      if (typingInterval.current) clearInterval(typingInterval.current);
      if (subTypingInterval.current) clearInterval(subTypingInterval.current);
    };
  }, [currentStateIndex]);

  // 打字效果函数
  const typeText = (text, setDisplayedText, currentIndex, setCurrentIndex, deleting, setDeleting) => {
    if (deleting) {
      // 删除字符
      setDisplayedText(prev => prev.substring(0, currentIndex - 1));
      setCurrentIndex(prev => prev - 1);

      // 当删除完成时，停止删除
      if (currentIndex <= 0) {
        setDeleting(false);
      }
    } else {
      // 添加字符
      setDisplayedText(prev => prev + text.charAt(currentIndex));
      setCurrentIndex(prev => prev + 1);

      // 当添加完成时，开始删除
      if (currentIndex >= text.length - 1) {
        setDeleting(true);
      }
    }
  };

  // 开始生成过程
  const startGeneration = () => {
    generationInterval.current = setInterval(() => {
      setCurrentPercentage(prev => {
        const newPercentage = prev + 1;

        // 更新数据处理可视化
        setActiveCells(Math.floor((newPercentage / 100) * 15));

        // 更新Excel预览
        updateExcelPreview(newPercentage);

        // 检查是否需要更新状态
        if (currentStateIndex < generationStates.length - 1 &&
            newPercentage >= generationStates[currentStateIndex + 1].percentage) {
          setCurrentStateIndex(prev => prev + 1);
        }

        // 检查是否完成
        if (newPercentage >= 100) {
          completeGeneration();
        }

        return newPercentage;
      });
    }, 100);
  };

  // 更新Excel预览
  const updateExcelPreview = (percentage) => {
    const filledCells = Math.floor((percentage / 100) * 25); // 5行5列共25个单元格
    const newTableData = [...initialTableData];

    let cellCount = 0;

    for (let i = 0; i < newTableData.length; i++) {
      for (const key in newTableData[i]) {
        if (key !== 'key' && cellCount < filledCells) {
          // 随机填充一些数据
          if (Math.random() > 0.5) {
            newTableData[i][key] = Math.floor(Math.random() * 1000);
          } else {
            const text = ['产品A', '产品B', '产品C', '产品D', '产品E'][Math.floor(Math.random() * 5)];
            newTableData[i][key] = text;
          }
          cellCount++;
        } else if (key !== 'key') {
          newTableData[i][key] = '';
        }
      }
    }

    setTableData(newTableData);
  };

  // 完成生成
  const completeGeneration = () => {
    clearInterval(generationInterval.current);
    setIsCompleted(true);
  };

  // 取消生成
  const cancelGeneration = () => {
    if (isCancelled) return;

    setIsCancelled(true);
    clearInterval(generationInterval.current);
  };

  // 下载文件
  const downloadFile = () => {
    alert('文件下载已开始，请在下载文件夹中查看。');
  };

  // 初始化鼠标跟随效果
  const initMouseFollowEffect = () => {
    if (!mouseFollowContainer.current) return;

    document.addEventListener('mousemove', (e) => {
      const currentX = e.clientX;
      const currentY = e.clientY;

      // 计算与上次位置的距离
      const distance = Math.sqrt(
        Math.pow(currentX - lastMousePosition.current.x, 2) +
        Math.pow(currentY - lastMousePosition.current.y, 2)
      );

      // 如果移动距离足够大，创建新元素
      if (distance > 50) {
        createFollowElement(currentX, currentY);
        lastMousePosition.current = { x: currentX, y: currentY };
      }
    });
  };

  // 创建鼠标跟随元素
  const createFollowElement = (x, y) => {
    if (!mouseFollowContainer.current) return;

    const dot = document.createElement('div');
    dot.style.cssText = `
      position: absolute;
      width: 8px;
      height: 8px;
      background-color: #3b82f6;
      border-radius: 50%;
      opacity: 0;
      transition: all 0.5s ease;
      top: ${y}px;
      left: ${x}px;
    `;

    mouseFollowContainer.current.appendChild(dot);

    // 强制重排后添加动画类
    setTimeout(() => {
      dot.style.opacity = '1';
      dot.style.transform = 'scale(5)';

      // 0.5秒后开始淡出
      setTimeout(() => {
        dot.style.opacity = '0';
        dot.style.transform = 'scale(1)';

        // 动画完成后移除元素
        setTimeout(() => {
          if (mouseFollowContainer.current && dot.parentNode) {
            mouseFollowContainer.current.removeChild(dot);
          }
        }, 500);
      }, 500);
    }, 10);
  };

  // 获取当前状态
  const currentState = generationStates[currentStateIndex];

  // 获取进度条颜色
  const getProgressColor = () => {
    if (currentPercentage < 30) return '#3b82f6';
    if (currentPercentage < 70) return '#f59e0b';
    return '#10b981';
  };

  return (
    <div css={styles.container}>
      {/* 鼠标跟随效果容器 */}
      <div ref={mouseFollowContainer} css={styles.mouseFollowContainer}></div>

      {/* 生成中卡片 */}
      <Card css={styles.card}>
        {/* 标题区域 */}
        <div css={styles.title}>
          <img
            src="https://p26-doubao-search-sign.byteimg.com/labis/5e8999acbc4be0ade9b9fb789252edf9~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1776650251&x-signature=zx5I1vqgx40yk6UjtHqAz%2FVvUE8%3D"
            alt="Excel图标"
            width="40"
            height="40"
            css={styles.excelIcon}
          />
          <Typography.Title level={3} css={styles.title}>Excel文件生成中</Typography.Title>
        </div>

        {/* 进度展示区域 */}
        <div css={styles.progressContainer}>
          <div css={styles.progressText}>
            <Typography.Text>{currentPercentage}%</Typography.Text>
            <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
              {currentPercentage < 100 ?
                `预计剩余时间: ${Math.round((100 - currentPercentage) * 0.2)}秒` :
                '已完成'}
            </Typography.Text>
          </div>
          <Progress
            percent={currentPercentage}
            strokeColor={getProgressColor()}
            strokeWidth={4}
            trailColor="#2d2d2d"
            status={currentPercentage === 100 ? "success" : "active"}
          />
        </div>

        {/* 状态信息区域 */}
        <div css={styles.statusContainer}>
          <div css={styles.statusIcon}>
            {isCancelled ? (
              <CloseOutlined style={{ color: '#ef4444', fontSize: '20px' }} />
            ) : currentPercentage === 100 ? (
              <CheckOutlined style={{ color: '#10b981', fontSize: '20px' }} />
            ) : (
              <Spin indicator={<LoadingOutlined style={{ color: '#3b82f6', fontSize: '20px' }} spin />} />
            )}
          </div>
          <div>
            <Typography.Text css={styles.statusText}>
              {isCancelled ? '生成已取消' : `${displayedStatus}`}
              {!isCancelled && currentPercentage < 100 && (
                <span css={styles.typingCursor} style={{ marginLeft: '2px' }}></span>
              )}
            </Typography.Text>
            <br />
            <Typography.Text css={styles.subStatusText}>
              {isCancelled ? '用户已中断文件生成过程' : displayedSubStatus}
            </Typography.Text>
          </div>
        </div>

        {/* 数据处理可视化 */}
        <div css={styles.visualizationContainer}>
          <Typography.Text css={styles.visualizationTitle}>数据处理可视化</Typography.Text>
          <div css={styles.dataCells}>
            {[...Array(15)].map((_, index) => (
              <div
                key={index}
                css={[
                  styles.dataCell,
                  index < activeCells ? styles.dataCellActive : null
                ]}
              ></div>
            ))}
          </div>
        </div>

        {/* Excel表格预览 */}
        <div css={styles.excelTable}>
          <div css={styles.tableHeader}>
            <div css={styles.sheetName}>Sheet1</div>
            <div css={styles.windowControls}>
              <div css={[styles.controlButton, { backgroundColor: '#ef4444' }]}></div>
              <div css={[styles.controlButton, { backgroundColor: '#f59e0b' }]}></div>
              <div css={[styles.controlButton, { backgroundColor: '#10b981' }]}></div>
            </div>
          </div>
          <div css={styles.tableContainer}>
            <Table
              dataSource={tableData}
              columns={columns}
              pagination={false}
              size="small"
              css={styles.antTable}
              components={{
                header: {
                  wrapper: { style: { backgroundColor: '#2d2d2d' } },
                  cell: { style: { color: '#aaa', fontWeight: '300', fontSize: '12px', backgroundColor: '#2d2d2d', border: '1px solid #3d3d3d' } }
                },
                body: {
                  cell: ({ children, record, index, dataIndex }) => {
                    const isFilled = children !== '';
                    return (
                      <td style={{
                        color: '#ddd',
                        fontSize: '12px',
                        border: '1px solid #3d3d3d',
                        backgroundColor: isFilled ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                        color: isFilled ? '#3b82f6' : '#ddd'
                      }}>
                        {children}
                      </td>
                    );
                  }
                }
              }}
            />
          </div>
        </div>

        {/* 操作按钮区域 */}
        <div css={styles.buttonContainer}>
          <Button
            icon={<CloseOutlined />}
            css={styles.cancelButton}
            onClick={cancelGeneration}
            disabled={isCompleted || isCancelled}
          >
            取消
          </Button>
        </div>
      </Card>

      {/* 完成状态卡片 (初始隐藏) */}
      {isCompleted && (
        <Card css={styles.completeCard}>
          <div css={styles.completeTitle}>
            <CheckOutlined css={styles.completeIcon} style={{ fontSize: '24px' }} />
            <Typography.Title level={3} css={styles.completeTitle}>Excel文件生成完成</Typography.Title>
          </div>

          <Typography.Text css={styles.completeMessage}>
            您的Excel文件已成功生成，可以点击下方按钮下载。
          </Typography.Text>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              icon={<DownloadOutlined />}
              css={styles.downloadButton}
              onClick={downloadFile}
            >
              下载文件
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default App;
