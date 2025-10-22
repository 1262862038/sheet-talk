import React, { useState, useEffect, useRef } from 'react';
import { Card, Progress, Typography, Table, Button, Spin } from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  DownloadOutlined,
  LoadingOutlined,
  DatabaseOutlined,
  FileExcelOutlined,
  LineChartOutlined,
  BorderOutlined
} from '@ant-design/icons';
import './index.less';

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
  // 状态管理
  const [currentStateIndex, setCurrentStateIndex] = useState(0);
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [tableData, setTableData] = useState(initialTableData);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const [activeCells, setActiveCells] = useState(0);
  const [displayedStatus, setDisplayedStatus] = useState('');
  const [displayedSubStatus, setDisplayedSubStatus] = useState('');

  // 引用
  const generationInterval = useRef(null);
  const typingRef = useRef({});
  const mouseFollowContainer = useRef(null);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // 初始化
  useEffect(() => {
    // 创建鼠标跟随容器
    const container = document.createElement('div');
    container.className = 'mouse-follow-container';
    document.body.appendChild(container);
    mouseFollowContainer.current = container;

    // 开始生成过程
    startGeneration();
    // 初始化第一个状态的打字效果
    startTyping(generationStates[0].name, setDisplayedStatus, 'main');
    startTyping(generationStates[0].subname, setDisplayedSubStatus, 'sub');

    // 清理函数
    return () => {
      if (generationInterval.current) clearInterval(generationInterval.current);
      Object.values(typingRef.current).forEach(interval => {
        clearInterval(interval);
      });
      if (mouseFollowContainer.current && mouseFollowContainer.current.parentNode) {
        mouseFollowContainer.current.parentNode.removeChild(mouseFollowContainer.current);
      }
    };
  }, []);

  // 状态变化时更新打字效果
  useEffect(() => {
    if (currentStateIndex >= generationStates.length) return;

    const currentState = generationStates[currentStateIndex];
    // 清除之前的打字定时器
    if (typingRef.current.main) clearInterval(typingRef.current.main);
    if (typingRef.current.sub) clearInterval(typingRef.current.sub);

    // 开始新的打字效果
    startTyping(currentState.name, setDisplayedStatus, 'main');
    startTyping(currentState.subname, setDisplayedSubStatus, 'sub');
  }, [currentStateIndex]);

  // 鼠标移动效果
  // useEffect(() => {
  //   const handleMouseMove = (e) => {
  //     const currentX = e.clientX;
  //     const currentY = e.clientY;

  //     // 计算与上次位置的距离
  //     const distance = Math.sqrt(
  //       Math.pow(currentX - lastMousePos.current.x, 2) +
  //       Math.pow(currentY - lastMousePos.current.y, 2)
  //     );

  //     // 如果移动距离足够大，创建新元素
  //     if (distance > 50) {
  //       createMouseTrail(currentX, currentY);
  //       lastMousePos.current = { x: currentX, y: currentY };
  //     }
  //   };

  //   document.addEventListener('mousemove', handleMouseMove);
  //   return () => document.removeEventListener('mousemove', handleMouseMove);
  // }, []);

  // 打字效果函数
  const startTyping = (text, setDisplayFunction, type) => {
    let charIndex = 0;
    let isDeleting = false;

    // 清除之前的定时器
    if (typingRef.current[type]) clearInterval(typingRef.current[type]);

    // 设置初始文本为空
    setDisplayFunction('');

    // 开始打字动画
    typingRef.current[type] = setInterval(() => {
      if (isDeleting) {
        // 删除字符
        setDisplayFunction(prev => prev.substring(0, charIndex - 1));
        charIndex--;

        // 当删除完成时，停止删除
        if (charIndex <= 0) {
          isDeleting = false;
        }
      } else {
        // 添加字符
        setDisplayFunction(prev => prev + text.charAt(charIndex));
        charIndex++;

        // 当添加完成时，开始删除
        if (charIndex >= text.length) {
          isDeleting = true;
        }
      }
    }, type === 'main' ? 50 : 30);
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
    }, 1000);
  };

  // 更新Excel预览
  const updateExcelPreview = (percentage) => {
    const filledCells = Math.floor((percentage / 100) * 25); // 5行5列共25个单元格
    const newTableData = JSON.parse(JSON.stringify(initialTableData));

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

  // 创建鼠标轨迹
  const createMouseTrail = (x, y) => {
    if (!mouseFollowContainer.current) return;

    const dot = document.createElement('div');
    dot.style.cssText = `
      position: absolute;
      width: 6px;
      height: 6px;
      background-color: #3b82f6;
      border-radius: 50%;
      opacity: 0;
      transition: all 0.6s ease;
      top: ${y}px;
      left: ${x}px;
      pointer-events: none;
    `;

    mouseFollowContainer.current.appendChild(dot);

    // 触发动画
    setTimeout(() => {
      dot.style.opacity = '0.8';
      dot.style.transform = 'scale(4)';

      // 淡出并移除
      setTimeout(() => {
        dot.style.opacity = '0';
        setTimeout(() => {
          if (dot.parentNode) {
            dot.parentNode.removeChild(dot);
          }
        }, 600);
      }, 400);
    }, 10);
  };

  // 获取当前状态
  const currentState = generationStates[currentStateIndex] || generationStates[0];

  // 获取进度条颜色
  const getProgressColor = () => {
    if (currentPercentage < 30) return '#3b82f6';
    if (currentPercentage < 70) return '#f59e0b';
    return '#10b981';
  };

  return (
        <Card className="main-card">
          {/* 标题区域 */}
          <div className="title-area">
            <img
              src="https://p26-doubao-search-sign.byteimg.com/labis/5e8999acbc4be0ade9b9fb789252edf9~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1776650251&x-signature=zx5I1vqgx40yk6UjtHqAz%2FVvUE8%3D"
              alt="Excel图标"
              className="excel-icon"
            />
            <Typography.Title level={4} className="title-text">Excel文件生成中</Typography.Title>
          </div>

          <div className="content-area">
            {/* 进度展示区域 */}
            <div className="progress-section">
              <div className="progress-info">
                <span className="percentage">{currentPercentage}%</span>
                <span className="time-estimate">
                  {currentPercentage < 100 && !isCancelled
                    ? `预计剩余时间: ${Math.round((100 - currentPercentage) * 0.2)}秒`
                    : currentPercentage === 100
                      ? '已完成'
                      : '已取消'}
                </span>
              </div>
              <Progress
                percent={currentPercentage}
                strokeColor={getProgressColor()}
                strokeWidth={10}
                trailColor="#2d2d2d"
                status={isCancelled ? "exception" : currentPercentage === 100 ? "success" : "active"}
              />
            </div>



            {/* 数据处理可视化 */}
            <div className="data-visualization">
              <div className="visualization-title">数据处理可视化</div>
              <div className="data-cells">
                {[...Array(15)].map((_, index) => (
                  <div
                    key={index}
                    className={`data-cell ${index < activeCells ? 'active' : ''}`}
                  ></div>
                ))}
              </div>
            </div>
 {/* 状态信息区域 */}
            {/* <div className="status-section">
              <div className="status-item">
                <div className="status-icon">
                  {isCancelled ? (
                    <CloseOutlined style={{ color: '#ef4444' }} />
                  ) : currentPercentage === 100 ? (
                    <CheckOutlined style={{ color: '#10b981' }} />
                  ) : (
                    <Spin indicator={<LoadingOutlined style={{ color: '#3b82f6' }} spin />} />
                  )}
                </div>
                <div className="status-texts">

                  <div className="sub-status">
                    {currentPercentage === 100  ? '您的Excel文件已成功生成，可以点击按钮下载' : '正在生成中，请稍等！'}
                  </div>
                </div>
                {
                  currentPercentage === 100 &&  <Button
                className="cancel-btn"
                onClick={cancelGeneration}
              >
                下载
              </Button>
                }

              </div>
            </div> */}
            {/* Excel表格预览 */}
            {/* <div className="excel-preview">
              <div className="table-header">
                <div className="sheet-name">Sheet1</div>
                <div className="window-controls">
                  <div className="control-btn" style={{ backgroundColor: '#ef4444' }}></div>
                  <div className="control-btn" style={{ backgroundColor: '#f59e0b' }}></div>
                  <div className="control-btn" style={{ backgroundColor: '#10b981' }}></div>
                </div>
              </div>
              <div className="table-content">
                <Table
                  dataSource={tableData}
                  columns={columns}
                  pagination={false}
                  size="small"
                  className="ant-table"
                  components={{
                    body: {
                      cell: ({ children, ...restProps }) => (
                        <td
                          {...restProps}
                          className={children ? 'ant-table-cell filled' : 'ant-table-cell'}
                        >
                          {children}
                        </td>
                      )
                    }
                  }}
                />
              </div>
            </div> */}

            {/* 操作按钮区域 */}
            {/* <div className="button-area">
              <Button
                icon={<CloseOutlined />}
                className="cancel-btn"
                onClick={cancelGeneration}
                disabled={isCompleted || isCancelled}
              >
                取消
              </Button>
            </div> */}
          </div>
        </Card>


  );
};

export default App;
