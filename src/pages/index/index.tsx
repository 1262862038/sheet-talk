import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
const Index = () => {
  const [inputText, setInputText] = useState('');
 const navigate = useNavigate();
const handlePromptChange = (e) => {
  setInputText(e.target.value.trim());
}
  const handleGenerateClick = (val?: string) => {
     if (!inputText.trim() && !val) {
      message.warning('请输入您的需求描述');
      return;
      }
       // 跳转到聊天页面并携带参数
       localStorage.setItem('prompt', val || inputText);
    navigate('/chat');
    }
  useEffect(() => {


  }, []);
  return (
    <div className='bg-gray-900 text-gray-100 font-sans'>

    <Header />
    <header className="pt-24 pb-16 md:pt-32 md:pb-24 bg-cover bg-center" style={{backgroundImage: "url('https://p3-flow-imagex-sign.byteimg.com/tos-cn-i-a9rns2rl98/rc/pc/super_tool/3d96b7a6658a41b6bad6316553e2cdc1~tplv-a9rns2rl98-image.image?rcl=20251021103801986728D5DDF25670FC0E&rk3s=8e244e95&rrcfp=f06b921b&x-expires=1763606310&x-signature=lPH%2Bx6Wr14YFHcY51%2FgbHIQ1XuU%3D')"}}>
        <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white text-shadow">
                    突破性<span className="bg-gradient-to-r from-primary to-secondary text-gradient">Excel生成技术</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-white text-shadow">从思路到实体的跨越，让AI直接为您创建专业Excel文件</p>
                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <a href="#generator" className="bg-secondary hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-gray-700 hover:shadow-gray-700 transform hover:-translate-y-1 duration-300">
                        立即生成Excel
                    </a>
                    <a href="#features" className="bg-gray-800 hover:bg-gray-800 text-primary font-bold py-3 px-8 rounded-lg transition-colors shadow-gray-700 hover:shadow-gray-700 transform hover:-translate-y-1 duration-300">
                        了解更多
                    </a>
                </div>
            </div>
        </div>
    </header>
<main>


   <section className="py-16 bg-gray-800">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-center">传统AI的局限，我们的突破</h2>
                    <div className="bg-gray-900 rounded-xl p-8 shadow-gray-700">
                        <p className="text-lg mb-6">当前主流大模型能解答多数问题，但在实际文件创建方面存在明显局限。当您需要制作专业的Excel或PPT时，传统AI只能提供思路建议，却无法交付可直接使用的文件。</p>
                        <div className="flex items-center justify-center my-8">
                            <div className="w-1/3 border-t-2 border-gray-700"></div>
                            <div className="px-4 text-gray-400">VS</div>
                            <div className="w-1/3 border-t-2 border-gray-700"></div>
                        </div>
                        <p className="text-lg font-semibold text-primary">我们的解决方案实现了三大突破：从"告诉您怎么做"升级为"直接为您做好"</p>
                    </div>
                </div>
            </div>
        </section>
          <section id="features" className="py-16 bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 text-center">三大核心突破</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="feature-card bg-gray-800 rounded-xl p-8 shadow-gray-700">
                        <div className="bg-blue-900 text-primary w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <i className="fa fa-file-excel-o text-3xl"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-center">完整文件生成</h3>
                        <p className="text-gray-300 text-center">不仅包含基础表格，还支持复杂公式、多维图表、多张Sheet页、深度分析等高级功能</p>
                    </div>
                    <div className="feature-card bg-gray-800 rounded-xl p-8 shadow-gray-700">
                        <div className="bg-orange-900 text-secondary w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <i className="fa fa-money text-3xl"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-center">成本革命</h3>
                        <p className="text-gray-300 text-center">相比市场同类产品，生成成本降低200倍，极致的性价比，让每位用户都能轻松享受智能办公</p>
                    </div>
                    <div className="feature-card bg-gray-800 rounded-xl p-8 shadow-gray-700">
                        <div className="bg-green-900 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <i className="fa fa-rocket text-3xl"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-center">即开即用</h3>
                        <p className="text-gray-300 text-center">生成的Excel文件无需二次修改，直接满足您的业务需求，节省宝贵时间</p>
                    </div>
                </div>
            </div>
        </section>
          <section id="how-it-works" className="py-16 bg-gray-800">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 text-center">简单三步，轻松生成</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="flex flex-col items-center text-center">
                        <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 text-2xl font-bold">1</div>
                        <h3 className="text-xl font-bold mb-4">描述您的需求</h3>
                        <p className="text-gray-300">输入任何描述，越详细越好，系统会根据您的需求生成最合适的Excel文件</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 text-2xl font-bold">2</div>
                        <h3 className="text-xl font-bold mb-4">等待生成</h3>
                        <p className="text-gray-300">系统自动处理您的请求，生成过程大约需要2～5分钟，请耐心等待</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mb-6 text-2xl font-bold">3</div>
                        <h3 className="text-xl font-bold mb-4">下载使用</h3>
                        <p className="text-gray-300">生成完成后，您可以直接下载Excel文件，无需任何修改即可使用</p>
                    </div>
                </div>
            </div>
        </section>

            <section id="generator" className="py-16 bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 text-center">开始生成您的Excel</h2>
                <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-gray-700 overflow-hidden">
                    <div className="p-8">
                        <div className="mb-6">
                            <label for="excel-prompt" className="block text-gray-200 font-medium mb-2">描述您需要的Excel文件</label>
                            <textarea value={inputText} onChange={handlePromptChange} id="excel-prompt" rows="5" className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="例如：生成一个销售数据统计表格，包含月度销售额、同比增长率、产品类别分布等信息，并自动生成相应的图表分析..."></textarea>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-400">
                                <i className="fa fa-info-circle mr-1"></i> 提示：描述越详细，生成的Excel效果越好
                            </div>
                            <button onClick={() => handleGenerateClick()} id="generate-btn" className="bg-secondary hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-gray-700 hover:shadow-gray-700 transform hover:-translate-y-1 duration-300">
                                生成Excel文件
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
          <section id="generation-status" className="py-16 bg-gray-800 hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gray-900 rounded-xl p-8 shadow-gray-700">
                        <h3 className="text-2xl font-bold mb-6 text-center">正在生成您的Excel文件</h3>

                        <div className="mb-8">
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-300">生成进度</span>
                                <span id="progress-percentage" className="text-primary font-semibold">0%</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div id="progress-bar" className="h-full bg-primary rounded-full" style={{width: "0%"}}></div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h4 className="text-lg font-semibold mb-4">生成日志</h4>
                            <div id="generation-log" className="bg-gray-800 rounded-lg p-4 h-40 overflow-y-auto border border-gray-700">
                                <div className="typing" id="log-text">正在初始化生成环境...</div>
                            </div>
                        </div>

                        <div className="text-center mb-8">
                            <p className="text-gray-300">预计剩余时间：<span id="time-remaining" className="font-semibold">5分钟</span></p>
                        </div>

                        <div className="text-center">
                            <button id="cancel-btn" className="bg-gray-700 hover:bg-gray-300 text-gray-200 font-bold py-2 px-6 rounded-lg transition-colors">
                                取消生成
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

           <section id="result" className="py-16 bg-gray-900 hidden">
            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-gray-800 rounded-xl shadow-gray-700 overflow-hidden">
                        <div className="p-8">
                            <h3 className="text-2xl font-bold mb-6 text-center text-green-600">
                                <i className="fa fa-check-circle mr-2"></i>Excel文件生成成功！
                            </h3>

                            <div className="mb-8">
                                <h4 className="text-lg font-semibold mb-4">文件预览</h4>
                                <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                                    <div id="excel-preview" className="grid grid-cols-5 gap-2">
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h4 className="text-lg font-semibold mb-4">文件信息</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-900 rounded-lg p-4">
                                        <p className="text-gray-300 mb-2"><i className="fa fa-file-excel-o mr-2 text-primary"></i>文件名：<span id="file-name" className="font-semibold">generated_excel.xlsx</span></p>
                                        <p className="text-gray-300 mb-2"><i className="fa fa-calendar mr-2 text-primary"></i>生成时间：<span id="generation-time" className="font-semibold">2025-07-22 15:30:45</span></p>
                                        <p className="text-gray-300"><i className="fa fa-database mr-2 text-primary"></i>文件大小：<span id="file-size" className="font-semibold">1.2 MB</span></p>
                                    </div>
                                    <div className="bg-gray-900 rounded-lg p-4">
                                        <p className="text-gray-300 mb-2"><i className="fa fa-table mr-2 text-primary"></i>工作表数量：<span id="sheet-count" className="font-semibold">3</span></p>
                                        <p className="text-gray-300 mb-2"><i className="fa fa-bar-chart mr-2 text-primary"></i>图表数量：<span id="chart-count" className="font-semibold">2</span></p>
                                        <p className="text-gray-300"><i className="fa fa-calculator mr-2 text-primary"></i>公式数量：<span id="formula-count" className="font-semibold">15</span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row justify-center gap-4">
                                <button id="download-btn" className="bg-primary hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-gray-700 hover:shadow-gray-700 transform hover:-translate-y-1 duration-300">
                                    <i className="fa fa-download mr-2"></i>下载Excel文件
                                </button>
                                <button id="new-generation-btn" className="bg-secondary hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-gray-700 hover:shadow-gray-700 transform hover:-translate-y-1 duration-300">
                                    <i className="fa fa-refresh mr-2"></i>生成新文件
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
          <section id="examples" className="py-16 bg-gray-800">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 text-center">Excel生成示例</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-gray-700 hover:shadow-gray-700 transition-shadow">
                        <img src="https://p3-doubao-search-sign.byteimg.com/labis/101ff89dcb95e3f52af4e97da3c2991d~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1766198291&x-signature=ATZ9g1DgWH77SDrY0nfHVvh5tk0%3D" alt="销售分析仪表盘" className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">销售分析仪表盘</h3>
                            <p className="text-gray-300 mb-4">包含多维度销售数据可视化、同比增长率分析和预测趋势图表</p>

                             <button onClick={() => handleGenerateClick('我们公司企业在过去一年中推出了三款产品，并对部分原有产品进行了价格调整。现在他们想通过PVM分析了解今年总收入增长的主要驱动力是什么。 以下是一些关键数据:价格因素:去年A的平均售价为1.5元/瓶，今年调整为1.6元/瓶，去年销量为1200万瓶。B的价格保持不变，仍为2元/瓶。 销量因素:A今年销量减少至1000万瓶。B今年销量稳定在800万瓶。新推出的三款C、D、E，分别售出2000万瓶、1500万瓶和1000万瓶，定价分别为2.5元/瓶、2元瓶和1.8元/瓶。产品组合因素:新品C、D、E带来的收入增量，请帮忙生成PVM模型表格模板，Excel模版需要带公式。')} className="example-btn bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm" data-example="财务数据">
                                查看示例
                            </button>
                        </div>
                    </div>
                    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-gray-700 hover:shadow-gray-700 transition-shadow">
                        <img src="https://p11-doubao-search-sign.byteimg.com/labis/f4f14e856aade2775058623b6ef59943~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1766198291&x-signature=ZKhQPy1%2FFuz%2FsVHWlkX0p36QzLY%3D" alt="财务数据看板" className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">财务数据看板</h3>
                            <p className="text-gray-300 mb-4">集成收入支出分析、利润计算、财务比率和预算执行情况</p>
                             <button onClick={() => handleGenerateClick('我要生成一个[个人所得税的Excel模板]，用于[计算每月个人所得税]，数据如下：[1月收入20000，2月收入30000，3月收入30000，4月收入40000，5月收入50000，6月收入60000，7月收入70000，8月收入80000，9月收入90000，10月收入100000，11月收入110000，12月收入120000]')} className="example-btn bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm" data-example="销售分析">
                                查看示例
                            </button>
                        </div>
                    </div>
                    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-gray-700 hover:shadow-gray-700 transition-shadow">
                        <img src="https://p3-doubao-search-sign.byteimg.com/labis/b21b296a53de6deb3b666ba7d4911e05~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1766198291&x-signature=bJu5J8%2BDT4BFl%2BCFfv4TmU67Two%3D" alt="市场调研分析" className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">市场调研分析</h3>
                            <p className="text-gray-300 mb-4">包含问卷数据统计、交叉分析、趋势预测和市场份额计算</p>
                            <button onClick={() => handleGenerateClick('随机生成excel')} className="example-btn bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm" data-example="市场调研">
                                查看示例
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

</main>

    </div>
  )
}

export default Index
