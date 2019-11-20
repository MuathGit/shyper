import React from 'react'

import chart1 from '../../assets/images/chart-1.png';
import chart2 from '../../assets/images/chart-2.png';
import { FormattedMessage } from 'react-intl'


export default class BodyComponent extends React.Component {
  
  render() {
    const Fragment = React.Fragment
      return( 
        <Fragment>
             <div className="home-container">
                <div className="row">
                <div className="col-md-8 mb-4 mb-md-0  fadeInRightLight animate">
                  <div className="hb p-4 h-100"> 
                    <div className="hbr-ch">
                      <div className="row">
                        <div className="col-md-5">
                          <h1 className="hb-ttl">
                            <span className="counter">1113</span>
                            <span className="ttl">البطاقات والرخص</span>
                          </h1>
                          <div className="hbr-desc">
                            <ul> 
                            <li><i className="circle purple mr-2" />  <FormattedMessage id='OperationCardsComponent'/>  <span className="font-weight-bold px-2"> 632 </span></li>
                            <li><i className="circle purple mr-2" />  <FormattedMessage id='DriversComponent'/>  <span className="font-weight-bold px-2"> 632 </span></li>
                              <li><i className="circle purple mr-2" />  بطاقات التشغيل  <span className="font-weight-bold px-2"> 632 </span></li>
                              <li><i className="circle yellow mr-2" />   بطاقات السائقين <span className="font-weight-bold px-2"> 343 </span> </li>
                              <li><i className="circle green mr-2" /> رخص قائدي المركبات      <span className="font-weight-bold px-2"> 221 </span> </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-7">
                          <div className="chart-1 mt-5 text-center">
                            <img src={chart1} alt='true' />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 fadeInLeftLight animate">
                  <div className="hb p-4 h-100"> 
                    <div className="hbl-ch">
                      <h1 className="hb-ttl mb-4">
                        <span className="counter">134</span>
                        <span className="ttl">  قائدي المركبات </span>
                      </h1>
                      <div className="chart-2 mt-5">
                        <img src={chart2} alt='true' className="w-100"/>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
                </div>
                <div className="row fadeInUp animate delay2">
                <div className="col-6 col-md-4 col-xl-2">
                  <a href="/home" className="hb hb-link mt-4 p-3">
                    <i aria-hidden="true" className="fa fa-fw fa-binoculars" />
                    <span>إضافة ترخيص المنشأة</span>
                  </a>
                </div>
                <div className="col-6 col-md-4 col-xl-2"> 
                  <a href="/home" className="hb hb-link mt-4 p-3">
                    <i aria-hidden="true" className="fa fa-fw fa-car" />
                    <span> إضافة مركبة </span>
                  </a> 
                </div>
                <div className="col-6 col-md-4 col-xl-2"> 
                  <a href="/home" className="hb hb-link mt-4 p-3">
                    <i aria-hidden="true" className="fa fa-fw fa-map-marker-alt" />
                    <span> إضافة نوع بطاقة تشغيل </span>
                  </a> 
                </div>
                <div className="col-6 col-md-4 col-xl-2"> 
                  <a href="/home" className="hb hb-link mt-4 p-3">
                    <i aria-hidden="true" className="fa fa-fw fa-users" />
                    <span>إضافة بطاقة تشغيل </span>
                  </a> 
                </div>
                <div className="col-6 col-md-4 col-xl-2"> 
                  <a href="/home" className="hb hb-link mt-4 p-3">
                    <i aria-hidden="true" className="fa fa-fw fa-lock" />
                    <span>إضافة قائد مركبة</span>
                  </a> 
                </div> 
                <div className="col-6 col-md-4 col-xl-2"> 
                  <a href="/home" className="hb hb-link mt-4 p-3">
                    <i aria-hidden="true" className="fa fa-fw fa-building" />
                    <span>إضافة رخصة قائد مركبة</span>
                  </a> 
                </div> 
              </div>
              
            </Fragment>);
      }
}

            
         