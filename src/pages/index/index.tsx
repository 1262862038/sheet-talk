import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import videoBg from './2a1bbe69a23cc898181b0e12860ed3d7.mov';
import arrow3 from './img/arrow-down-circle-line.png'
import './index.less';
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
    <div className='bg-gray-900 text-gray-100 font-sans snap-container'>

    <Header />

    <header className="section-one min-h-screen snap-section flex flex-col justify-center items-center pt-24 pb-16 md:pt-32 md:pb-24 bg-cover bg-center">
  <video src={videoBg} className='videoBg min-h-screen'  autoPlay loop muted webkit-playsinline playsInline
         x5-video-player-type="h5"
         x5-video-orientation="portrait"></video>
  <div className='mask'></div>
  <div className="section-one_inner mx-auto px-4 h-full flex items-center">
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white text-shadow">
        财税领域专业Excel建模专家
        {/* <span className="bg-gradient-to-r from-primary to-secondary text-gradient">Excel生成技术</span> */}
      </h1>
      <p className="text-xl md:text-2xl mb-8 text-white text-shadow">告别手动制表，公式、图表、多Sheet页全自动搞定
        <div>成本直降99%！</div>
      </p>
      {/* <p className="text-xl md:text-2xl mb-8 text-white text-shadow">成本直降99.5%！</p> */}
      <div className="flex flex-col md:flex-row justify-center gap-4" style={{marginTop: '100px'}}>
        {/* <a href="#generator" className="bg-secondary hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-gray-700 hover:shadow-gray-700 transform hover:-translate-y-1 duration-300">
          立即生成Excel
        </a> */}
        <div onClick={() =>  navigate('/chat')} className="bg-secondary hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-gray-700 hover:shadow-gray-700 transform hover:-translate-y-1 duration-300 md:w-[300px]">立即生成</div>
      </div>
    </div>
  </div>
  <div className='arrow' onClick={() => {
  // 获取下一个 snap-section 元素并滚动到那里
  const sections = document.querySelectorAll('.snap-section');
  if (sections.length > 1) {
    // 第二个 section 是下一个屏幕
    sections[1].scrollIntoView({ behavior: 'smooth' });
  }
}}><img src={arrow3} alt="" /></div>
</header>

<div className='min-h-screen snap-section bg-gray-800' style={{position: 'relative'}}>
   {/* <section id="examples" className="py-16 bg-gray-800">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 text-center">Excel生成体验</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-gray-700 hover:shadow-gray-700 transition-shadow">
                        <img src="https://p3-doubao-search-sign.byteimg.com/labis/101ff89dcb95e3f52af4e97da3c2991d~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1766198291&x-signature=ATZ9g1DgWH77SDrY0nfHVvh5tk0%3D" alt="销售分析仪表盘" className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">生成个人所得税 Excel模版</h3>
                            <p className="text-gray-300 mb-4">包含数据图表，多Sheet页，说明等信息</p>
                            <button onClick={() => handleGenerateClick('我要生成一个[个人所得税的Excel模板]，用于[计算每月个人所得税]，数据如下：[1月收入20000，2月收入30000，3月收入30000，4月收入40000，5月收入50000，6月收入60000，7月收入70000，8月收入80000，9月收入90000，10月收入100000，11月收入110000，12月收入120000]')} className="example-btn bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm" data-example="销售分析">
                                立即体验
                            </button>

                        </div>
                    </div>
                    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-gray-700 hover:shadow-gray-700 transition-shadow">
                        <img src="https://p11-doubao-search-sign.byteimg.com/labis/f4f14e856aade2775058623b6ef59943~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1766198291&x-signature=ZKhQPy1%2FFuz%2FsVHWlkX0p36QzLY%3D" alt="财务数据看板" className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">生成一个PVM分析表格模版</h3>
                            <p className="text-gray-300 mb-4">集成PVM基础数据、报表分析、图表说明等</p>
                              <button onClick={() => handleGenerateClick('我们公司企业在过去一年中推出了三款产品，并对部分原有产品进行了价格调整。现在他们想通过PVM分析了解今年总收入增长的主要驱动力是什么。 以下是一些关键数据:价格因素:去年A的平均售价为1.5元/瓶，今年调整为1.6元/瓶，去年销量为1200万瓶。B的价格保持不变，仍为2元/瓶。 销量因素:A今年销量减少至1000万瓶。B今年销量稳定在800万瓶。新推出的三款C、D、E，分别售出2000万瓶、1500万瓶和1000万瓶，定价分别为2.5元/瓶、2元瓶和1.8元/瓶。产品组合因素:新品C、D、E带来的收入增量，请帮忙生成PVM模型表格模板，Excel模版需要带公式。')} className="example-btn bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm" data-example="财务数据">
                                立即体验
                            </button>
                        </div>
                    </div>
                    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-gray-700 hover:shadow-gray-700 transition-shadow">
                        <img src="https://p3-doubao-search-sign.byteimg.com/labis/b21b296a53de6deb3b666ba7d4911e05~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1766198291&x-signature=bJu5J8%2BDT4BFl%2BCFfv4TmU67Two%3D" alt="市场调研分析" className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">随机生成一个Excel模版</h3>
                            <p className="text-gray-300 mb-4">内容随机填充，仅供下载参考</p>
                            <button onClick={() => handleGenerateClick('随机生成excel')} className="example-btn bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm" data-example="市场调研">
                                立即体验
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section> */}
          <section id="how-it-works" className="py-16 bg-gray-800">
            <div className="container mx-auto px-4" style={{marginTop: '40px'}}>
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
        <section id="examples" className="pt-0 py-16 bg-gray-800">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 text-center">Excel生成体验</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-gray-700 hover:shadow-gray-700 transition-shadow">
                        <img src="https://p3-doubao-search-sign.byteimg.com/labis/101ff89dcb95e3f52af4e97da3c2991d~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1766198291&x-signature=ATZ9g1DgWH77SDrY0nfHVvh5tk0%3D" alt="销售分析仪表盘" className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">生成个人所得税 Excel模版</h3>
                            <p className="text-gray-300 mb-4">包含数据图表，多Sheet页，说明等信息</p>
                            <button onClick={() => handleGenerateClick('我要生成一个[个人所得税的Excel模板]，用于[计算每月个人所得税]，数据如下：[1月收入20000，2月收入30000，3月收入30000，4月收入40000，5月收入50000，6月收入60000，7月收入70000，8月收入80000，9月收入90000，10月收入100000，11月收入110000，12月收入120000]')} className="example-btn bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm" data-example="销售分析">
                                立即体验
                            </button>

                        </div>
                    </div>
                    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-gray-700 hover:shadow-gray-700 transition-shadow">
                        <img src="https://p11-doubao-search-sign.byteimg.com/labis/f4f14e856aade2775058623b6ef59943~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1766198291&x-signature=ZKhQPy1%2FFuz%2FsVHWlkX0p36QzLY%3D" alt="财务数据看板" className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">生成一个PVM分析表格模版</h3>
                            <p className="text-gray-300 mb-4">集成PVM基础数据、报表分析、图表说明等</p>
                              <button onClick={() => handleGenerateClick('我们公司企业在过去一年中推出了三款产品，并对部分原有产品进行了价格调整。现在他们想通过PVM分析了解今年总收入增长的主要驱动力是什么。 以下是一些关键数据:价格因素:去年A的平均售价为1.5元/瓶，今年调整为1.6元/瓶，去年销量为1200万瓶。B的价格保持不变，仍为2元/瓶。 销量因素:A今年销量减少至1000万瓶。B今年销量稳定在800万瓶。新推出的三款C、D、E，分别售出2000万瓶、1500万瓶和1000万瓶，定价分别为2.5元/瓶、2元瓶和1.8元/瓶。产品组合因素:新品C、D、E带来的收入增量，请帮忙生成PVM模型表格模板，Excel模版需要带公式。')} className="example-btn bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm" data-example="财务数据">
                                立即体验
                            </button>
                        </div>
                    </div>
                    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-gray-700 hover:shadow-gray-700 transition-shadow">
                        <img src="https://p3-doubao-search-sign.byteimg.com/labis/b21b296a53de6deb3b666ba7d4911e05~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1766198291&x-signature=bJu5J8%2BDT4BFl%2BCFfv4TmU67Two%3D" alt="市场调研分析" className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">生成门店现金流预测模版</h3>
                            <p className="text-gray-300 mb-4">全自动生成月度预测报表，资金状况一目了然</p>
                            <button onClick={() => handleGenerateClick(`我是开一家小型咖啡店的，想看看明年每个月的现金够不够用。咖啡等饮品销售我预估第一个月收入5万元，之后每个月比上个月增长5%。糕点销售预估第一个月1万元，之后每月增长3%。支出方面房租每月1.5万元，员工工资每月2万元，水电杂费每月3000元，食材原料成本：按【总收入】的30%计算，市场推广费：前三个月每月8000元，之后减少到每月5000元。其他我们计划在4月份获得一笔5万元的小额贷款。9月份需要偿还一笔2万元的短期借款。请用公式把上面这些数据关系连起来，让我之后可以调整“月增长率”或“成本比例”等假设数字，整个预测表就能自动更新。帮我计算每个月的“净现金流”（收入减支出），以及“期末现金余额”。
如果某个月的“期末现金余额”变成负数了，请用红色自动标出提醒我。最后，在表格最下面汇总一下全年的“总收入”、“总支出”和“净现金流”。`)} className="example-btn bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm" data-example="市场调研">
                                立即体验
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </section>
            {/* <section id="generator" className="py-30 bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 text-center">开始生成您的Excel</h2>
                <div className="max-w-4xl mx-auto rounded-xl  overflow-hidden" style={{maxWidth: '1000px'}}>
                    <div className="p-8 bg-gray-800 shadow-gray-700">
                        <div className="mb-6">
                            <label for="excel-prompt" className="block text-gray-200 font-medium mb-2">描述您需要的Excel文件</label>
                            <textarea value={inputText} onChange={handlePromptChange} id="excel-prompt" rows="5" className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="例如：生成一个销售数据统计表格，包含月度销售额、同比增长率、产品类别分布等信息，并自动生成相应的图表分析..."></textarea>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-400">
                                <i className="fa fa-info-circle mr-1"></i> 提示：描述越详细，生成的Excel效果越好
                            </div>
                            <button onClick={() => handleGenerateClick()} style={{flexShrink: 0}} id="generate-btn" className="bg-secondary hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-gray-700 hover:shadow-gray-700 transform hover:-translate-y-1 duration-300">
                                立即生成
                            </button>
                        </div>
                    </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" style={{marginTop: '30px'}}>
                    <div className="bg-gray-800 shadow-gray-700 rounded-xl overflow-hidden shadow-gray-700 hover:shadow-gray-700 transition-shadow">
                        <img src="https://p3-doubao-search-sign.byteimg.com/labis/101ff89dcb95e3f52af4e97da3c2991d~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1766198291&x-signature=ATZ9g1DgWH77SDrY0nfHVvh5tk0%3D" alt="销售分析仪表盘" className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-bold mb-2">生成个人所得税 Excel模版</h3>
                            <p className="text-gray-300 mb-4">包含数据图表，多Sheet页，说明等信息</p>
                            <button onClick={() => handleGenerateClick('我要生成一个[个人所得税的Excel模板]，用于[计算每月个人所得税]，数据如下：[1月收入20000，2月收入30000，3月收入30000，4月收入40000，5月收入50000，6月收入60000，7月收入70000，8月收入80000，9月收入90000，10月收入100000，11月收入110000，12月收入120000]')} className="example-btn bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm" data-example="销售分析">
                                立即体验
                            </button>

                        </div>
                    </div>
                    <div className="bg-gray-800 shadow-gray-700 rounded-xl overflow-hidden shadow-gray-700 hover:shadow-gray-700 transition-shadow">
                        <img src="https://p11-doubao-search-sign.byteimg.com/labis/f4f14e856aade2775058623b6ef59943~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1766198291&x-signature=ZKhQPy1%2FFuz%2FsVHWlkX0p36QzLY%3D" alt="财务数据看板" className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-bold mb-2">生成一个PVM分析表格模版</h3>
                            <p className="text-gray-300 mb-4">集成PVM基础数据、报表分析、图表说明等</p>
                              <button onClick={() => handleGenerateClick('我们公司企业在过去一年中推出了三款产品，并对部分原有产品进行了价格调整。现在他们想通过PVM分析了解今年总收入增长的主要驱动力是什么。 以下是一些关键数据:价格因素:去年A的平均售价为1.5元/瓶，今年调整为1.6元/瓶，去年销量为1200万瓶。B的价格保持不变，仍为2元/瓶。 销量因素:A今年销量减少至1000万瓶。B今年销量稳定在800万瓶。新推出的三款C、D、E，分别售出2000万瓶、1500万瓶和1000万瓶，定价分别为2.5元/瓶、2元瓶和1.8元/瓶。产品组合因素:新品C、D、E带来的收入增量，请帮忙生成PVM模型表格模板，Excel模版需要带公式。')} className="example-btn bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm" data-example="财务数据">
                                立即体验
                            </button>
                        </div>
                    </div>
                    <div className="bg-gray-800 shadow-gray-700 rounded-xl overflow-hidden shadow-gray-700 hover:shadow-gray-700 transition-shadow">
                        <img src="https://p3-doubao-search-sign.byteimg.com/labis/b21b296a53de6deb3b666ba7d4911e05~tplv-be4g95zd3a-image.jpeg?rk3s=542c0f93&x-expires=1766198291&x-signature=bJu5J8%2BDT4BFl%2BCFfv4TmU67Two%3D" alt="市场调研分析" className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-bold mb-2">随机生成一个Excel模版</h3>
                            <p className="text-gray-300 mb-4">内容随机填充，仅供下载参考</p>
                            <button onClick={() => handleGenerateClick('随机生成excel')} className="example-btn bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm" data-example="市场调研">
                                立即体验
                            </button>
                        </div>
                    </div>
                </div>
                </div>

            </div>
        </section> */}
          <div className='arrow' onClick={() => {
  // 获取下一个 snap-section 元素并滚动到那里
  const sections = document.querySelectorAll('.snap-section');
  if (sections.length > 1) {
    // 第二个 section 是下一个屏幕
    sections[2].scrollIntoView({ behavior: 'smooth' });
  }
}}><img src={arrow3} alt="" /></div>

</div>


        <div className='min-h-screen snap-section'>
<section className="py-10 bg-gray-800 ">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto" style={{marginTop: '60px'}}>
                    <h2 className="text-3xl font-bold mb-8 text-center">传统AI的局限，我们的突破</h2>
                    <div className="bg-gray-900 rounded-xl p-8 shadow-gray-700">
                        <p className="text-lg mb-6">当前主流大模型能解答多数问题，但在实际文件创建方面存在明显局限。当您需要制作专业的Excel或PPT时，传统AI只能提供思路建议，却无法交付可直接使用的文件。</p>
                        <div className="flex items-center justify-center my-4">
                            <div className="w-1/3 border-t-2 border-gray-700"></div>
                            <div className="px-4 text-gray-400">VS</div>
                            <div className="w-1/3 border-t-2 border-gray-700"></div>
                        </div>
                        <p className="text-lg font-semibold text-primary">我们不仅从"告诉您怎么做"升级为"直接为您做好"，并结合多年财税领域资深经验和企业级知识库赋能Excel建模。</p>
                    </div>
                </div>
            </div>
        </section>
               <section id="features" className="py-8 bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 text-center">三大核心突破</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="feature-card bg-gray-800 rounded-xl p-8 shadow-gray-700">
                        <div className="bg-orange-900 text-secondary w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <i className="fa fa-money text-3xl"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-center">精准合规，模型即用</h3>
                        <p className="text-gray-300 text-center">通用大模型难以驾驭复杂的财税规则，它或许能提供思路，但无法确保合规与精准。我们的财税专家模型，深度内嵌财税法规，将资深专家的建模经验转化为标准动作，只交付即用且权威的财税Excel模型。</p>
                    </div>
                    <div className="feature-card bg-gray-800 rounded-xl p-8 shadow-gray-700">
                        <div className="bg-blue-900 text-primary w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <i className="fa fa-file-excel-o text-3xl"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-center">企业级财税知识库</h3>
                        <p className="text-gray-300 text-center">赋能Excel财务预测模型：依托深厚的财税知识库，将专业规则与数据关系动态关联，助力您获得更精准的业务洞察与决策依据。</p>
                    </div>

                    <div className="feature-card bg-gray-800 rounded-xl p-8 shadow-gray-700">
                        <div className="bg-green-900 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <i className="fa fa-rocket text-3xl"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-center">数据安全</h3>
                        <p className="text-gray-300 text-center">不仅包含基础表格，还支持复杂公式、多维图表、多张Sheet页、深度分析等高级功能，生成阶段，完全本地自主生成，生成成本降低200倍</p>
                    </div>
                </div>
            </div>

        </section>
          <div className='link'>
            友情提示：如果您还想体验一句话生成课程，请移步
           <a href='https://lingwei.gaodun.com/' target='_blank' >  🪄使用灵微，三步成课🪄</a>

          </div>






        </div>
         {/* <section className='bg-gray-900' style={{height: '60px'}}>

        </section> */}





    </div>
  )
}

export default Index
