/**
 * @created by kongqf
 * @description 全局自定义组件导入
 */
import Vue from 'vue';
import YuToolbar from '@/components/base/YuToolbar';
import YuPanel from '@/components/base/YuPanel';
import YuFormButtons from '@/components/base/YuFormButtons';
import YuToolBar from '@/components/widgets/YuToolBar';
import YufpIndustrySelector from '@/components/widgets/YufpIndustrySelector';
import YuIndustryClassfy from '@/components/widgets/YuIndustryClassfy';
import YufpSelectUser from '@/components/widgets/YufpSelectUser';
import YufpFrameList from '@/components/widgets/YufpFrameList';
import YufpLmtcusSelector from '@/components/widgets/YufpLmtcusSelector';
import YufpLmtcollabSelector from '@/components/widgets/YufpLmtcollabSelector';
import YufpLmtgroupSelector from '@/components/widgets/YufpLmtgroupSelector';
import YufpDropDownTable from '@/components/widgets/YufpDropDownTable';
import YufpProductSelector from '@/components/widgets/YufpProductSelector';
import YufpEditTable from '@/components/widgets/YufpEditTable';
import YufpDemoSelector from '@/components/widgets/YufpDemoSelector';
import YufpOrgTree from '@/components/widgets/YufpOrgTree';
import YufpZrcSelector from '@/components/widgets/YufpZrcSelector';
import YufpUserSelector from '@/components/widgets/YufpUserSelector';
import YufpWordCloud from '@/components/widgets/YufpWordCloud';
import YufpSearchTree from '@/components/widgets/YufpSearchTree';
import YufpPasswordModify from '@/components/widgets/YufpPasswordModify';
// 工作流相关
import YufpNwfInit from '@/components/widgets/YufpNwfInit';
import YufpNwfSubmit from '@/components/widgets/YufpNwfSubmit';
import YuWorkflow from '@/components/features/YuWorkflow';
import YufpUserSelectDialog from '@/components/features/YufpUserSelectDialog';
import YufpCopyUserSelector from '@/components/features/YufpCopyUserSelector';
import YufpNodeScriptEditor from '@/components/features/YufpNodeScriptEditor';
import YufpSubIdSelector from '@/components/features/YufpSubIdSelector';
// import YuCustomForm from "@/components/widgets/YuCustomForm"
// import YuCustomList from "@/components/widgets/YuCustomList"
// 列表弹出框
import YuXaccount from '@/components/widgets/xwidgets/YuXaccount';
import YuXbank from '@/components/widgets/xwidgets/YuXbank';
import YuXbankName from '@/components/widgets/xwidgets/YuXbankName';
import YuXbinsRule1 from '@/components/widgets/xwidgets/YuXbinsRule1';
import YuXbinsRule2 from '@/components/widgets/xwidgets/YuXbinsRule2';
import YuXcalu from '@/components/widgets/xwidgets/YuXcalu';
import YuXchkFormula from '@/components/widgets/xwidgets/YuXchkFormula';
import YuXchnlMrg from '@/components/widgets/xwidgets/YuXchnlMrg';
import YuXcltrlBase from '@/components/widgets/xwidgets/YuXcltrlBase';
import YuXcltrlBase1 from '@/components/widgets/xwidgets/YuXcltrlBase1';
import YuXcltrlBase2 from '@/components/widgets/xwidgets/YuXcltrlBase2';
import YuXcltrlBase3 from '@/components/widgets/xwidgets/YuXcltrlBase3';
import YuXcontTpl from '@/components/widgets/xwidgets/YuXcontTpl';
import YuXcoopCtr from '@/components/widgets/xwidgets/YuXcoopCtr';
import YuXcoopProto from '@/components/widgets/xwidgets/YuXcoopProto';
import YuXcreditBook from '@/components/widgets/xwidgets/YuXcreditBook';
import YuXcreditProto1 from '@/components/widgets/xwidgets/YuXcreditProto1';
import YuXcreditProto2 from '@/components/widgets/xwidgets/YuXcreditProto2';
import YuXcreditProto3 from '@/components/widgets/xwidgets/YuXcreditProto3';
import YuXcustom from '@/components/widgets/xwidgets/YuXcustom';
import YuXauthbook from '@/components/widgets/xwidgets/YuXauthbook';
import YuXcusBase from '@/components/widgets/xwidgets/YuXcusBase';
import YuXdataFlow from '@/components/widgets/xwidgets/YuXdataFlow';
import YuXdebtList from '@/components/widgets/xwidgets/YuXdebtList';
import YuXetrsCst1 from '@/components/widgets/xwidgets/YuXetrsCst1';
import YuXetrsCst2 from '@/components/widgets/xwidgets/YuXetrsCst2';
import YuXfinace from '@/components/widgets/xwidgets/YuXfinace';
import YuXfinaceCredit from '@/components/widgets/xwidgets/YuXfinaceCredit';
import YuXfinaceOrg from '@/components/widgets/xwidgets/YuXfinaceOrg';
import YuXfinApply from '@/components/widgets/xwidgets/YuXfinApply';
import YuXflexQuery from '@/components/widgets/xwidgets/YuXflexQuery';
import YuXflexQueryDetls from '@/components/widgets/xwidgets/YuXflexQueryDetls';
import YuXflexQueryGrp from '@/components/widgets/xwidgets/YuXflexQueryGrp';
import YuXflow from '@/components/widgets/xwidgets/YuXflow';
import YuXflowDefine from '@/components/widgets/xwidgets/YuXflowDefine';
import YuXfunc from '@/components/widgets/xwidgets/YuXfunc';
import YuXgrpMember from '@/components/widgets/xwidgets/YuXgrpMember';
import YuXloanCont from '@/components/widgets/xwidgets/YuXloanCont';
import YuXloan from '@/components/widgets/xwidgets/YuXloan';
import YuXloanProto from '@/components/widgets/xwidgets/YuXloanProto';
import YuXmodelFactory from '@/components/widgets/xwidgets/YuXmodelFactory';
import YuXorg from '@/components/widgets/xwidgets/YuXorg';
import YuRunInstance from '@/components/widgets/xwidgets/YuRunInstance';
import YuXorgQuery from '@/components/widgets/xwidgets/YuXorgQuery';
import YuXoutorgList from '@/components/widgets/xwidgets/YuXoutorgList';
import YuXoutorgMrg from '@/components/widgets/xwidgets/YuXoutorgMrg';
import YuXprdMrg from '@/components/widgets/xwidgets/YuXprdMrg';
import YuXproduct from '@/components/widgets/xwidgets/YuXproduct';
import YuXreportMrg from '@/components/widgets/xwidgets/YuXreportMrg';
import YuXrulesetinfo from '@/components/widgets/xwidgets/YuXrulesetinfo';
import YuXruleLibrary from '@/components/widgets/xwidgets/YuXruleLibrary';
import YuXtaskpoolOrg from '@/components/widgets/xwidgets/YuXtaskpoolOrg';
import YuXtaskpoolPerson from '@/components/widgets/xwidgets/YuXtaskpoolPerson';
import YuXtaskpoolPost from '@/components/widgets/xwidgets/YuXtaskpoolPost';
import YuXtaskpoolRule from '@/components/widgets/xwidgets/YuXtaskpoolRule';
import YuXtplSimp from '@/components/widgets/xwidgets/YuXtplSimp';
import YuXtreeDic from '@/components/widgets/xwidgets/YuXtreeDic';
import YuXunpay from '@/components/widgets/xwidgets/YuXunpay';
import YuXuplodList from '@/components/widgets/xwidgets/YuXuplodList';
import YuXuser from '@/components/widgets/xwidgets/YuXuser';
import YuXuser2 from '@/components/widgets/xwidgets/YuXuser2';
import YuXuser3 from '@/components/widgets/xwidgets/YuXuser3';
import YuXusero from '@/components/widgets/xwidgets/YuXusero';
import YuXuserPower from '@/components/widgets/xwidgets/YuXuserPower';
import YuXwfIns from '@/components/widgets/xwidgets/YuXwfIns';
import YuXiaoWei from '@/components/widgets/xwidgets/YuXiaoWei';
import YuRetail from '@/components/widgets/xwidgets/YuRetail';
import YuXwPrdPop from '@/components/widgets/xwidgets/YuXwPrdPop';
import YuXwPvpOrgFk from '@/components/widgets/xwidgets/YuXwPvpOrgFk';
import YuXwPvpOrgZw from '@/components/widgets/xwidgets/YuXwPvpOrgZw';
import YuXwydTask from '@/components/widgets/xwidgets/YuXwydTask';
import YuRetailProduct from '@/components/widgets/xwidgets/YuRetailProduct';
import YuGuarntr from '@/components/widgets/xwidgets/YuGuarntr';
import YuGuar from '@/components/widgets/xwidgets/YuGuar';
import AccEntrustLoan from '@/components/widgets/xwidgets/AccEntrustLoan'; //
import YuYhlv from '@/components/widgets/xwidgets/YuYhlv';
import YuGuarBaseInfoRetail from '@/components/widgets/YuGuarBaseInfoRetail';
import YuXwPvpOrgQf from '@/components/widgets/xwidgets/YuXwPvpOrgQf';
import YuXwPvpOrgCd from '@/components/widgets/xwidgets/YuXwPvpOrgCd';
import IqpLoanAppRetail from '@/components/widgets/xwidgets/IqpLoanAppRetail';

// 张家港弹出列表
import YuPvpAccpAppPop from '@/components/widgets/xwidgets/YuPvpAccpAppPop';
import YuXprdMrgInfo from '@/components/widgets/xwidgets/YuXprdMrgInfo';
import YuXpersonalInfo from '@/components/widgets/xwidgets/YuXpersonalInfo';
import YuXcreditQuery from '@/components/widgets/xwidgets/YuXcreditQuery';
import YuXintbank from '@/components/widgets/xwidgets/YuXintbank';
import YuXloadnObj from '@/components/widgets/xwidgets/YuXloadnObj';
import YuXtestPrd from '@/components/widgets/xwidgets/YuXtestPrd';
import YuXlstGlf from '@/components/widgets/xwidgets/YuXlstGlf';
import YuXcoopInfo from '@/components/widgets/xwidgets/YuXcoopInfo';
import YuXintbankList from '@/components/widgets/xwidgets/YuXintbankList';
import YuXcoopAcct from '@/components/widgets/xwidgets/YuXcoopAcct';
import YuXyndInfo from '@/components/widgets/xwidgets/YuXyndInfo';
import YuXpersonalTemp from '@/components/widgets/xwidgets/YuXpersonalTemp';
import YuXloanExt from '@/components/widgets/xwidgets/YuXloanExt';
import YuXintbankModify from '@/components/widgets/xwidgets/YuXintbankModify';
import YuXprjAcct from '@/components/widgets/xwidgets/YuXprjAcct';
import YuXcoopApply from '@/components/widgets/xwidgets/YuXcoopApply';
import YuXcusnumQuery from '@/components/widgets/xwidgets/YuXcusnumQuery';
import YuXlstYnd from '@/components/widgets/xwidgets/YuXlstYnd';
import YuXcoopCustom from '@/components/widgets/xwidgets/YuXcoopCustom';
import YuXgrpList from '@/components/widgets/xwidgets/YuXgrpList';
import YuXsocialRelate from '@/components/widgets/xwidgets/YuXsocialRelate';
import YuXbailInfo from '@/components/widgets/xwidgets/YuXbailInfo';
import YuXcoopPlan from '@/components/widgets/xwidgets/YuXcoopPlan';
import YuXcoopPlanAcc from '@/components/widgets/xwidgets/YuXcoopPlanAcc';
import YuXcoopPartnerAgr from '@/components/widgets/xwidgets/YuXcoopPartnerAgr';
import YuXpersonalBaseInfo from '@/components/widgets/xwidgets/YuXpersonalBaseInfo';
import YuXlstCustom from '@/components/widgets/xwidgets/YuXlstCustom';
import YuXgrpCustom from '@/components/widgets/xwidgets/YuXgrpCustom';
import YuXcusManager from '@/components/widgets/xwidgets/YuXcusManager';
import YuXapptMgr from '@/components/widgets/xwidgets/YuXapptMgr';
import YuXinbankAcct from '@/components/widgets/xwidgets/YuXinbankAcct';
import YuXcstContact from '@/components/widgets/xwidgets/YuXcstContact';
import YuXguarMax from '@/components/widgets/xwidgets/YuXguarMax';
import YuXguareClost from '@/components/widgets/xwidgets/YuXguareClost';
import YuXguarCont from '@/components/widgets/xwidgets/YuXguarCont';
import YuXctrContAspl from '@/components/widgets/xwidgets/YuXctrContAspl'; // 资产池白名单新增客户选取列表
import YuDgPrdPop from '@/components/widgets/xwidgets/YuDgPrdPop'; // 对公产品选取列表
import YuDgCtrPop from '@/components/widgets/xwidgets/YuDgCtrPop'; // 对公产品选取列表
import YuXuserForDh from '@/components/widgets/xwidgets/YuXuserForDh'; // 投贷后责任人选取列表
import YuXorgForDh from '@/components/widgets/xwidgets/YuXorgForDh'; // 投贷后责任机构选取列表

// 树弹出框
import YuXdicTree from '@/components/widgets/xwidgets/YuXdicTree';
import YuXdicTreeAddr from '@/components/widgets/xwidgets/YuXdicAddr';
import YuXdicTreeAddr2 from '@/components/widgets/xwidgets/YuXdicAddr2';
import YuXlmtsubTree from '@/components/widgets/xwidgets/YuXlmtsubTree';
import YuXorgTree from '@/components/widgets/xwidgets/YuXorgTree';
import YuXstdGb from '@/components/widgets/xwidgets/YuXstdGb';
import YuXgreenIndu from '@/components/widgets/xwidgets/YuXgreenIndu';
import YuXguarClass from '@/components/widgets/xwidgets/YuXguarClass';
import YuXprdCatalog from '@/components/widgets/xwidgets/YuXprdCatalog';
import YuXaddr from '@/components/widgets/xwidgets/YuXaddr';
import YuXmtablConf from '@/components/widgets/xwidgets/YuXmtablConf';
import YuXprdTree from '@/components/widgets/xwidgets/YuXprdTree';
import YuXsmOrg from '@/components/widgets/xwidgets/YuXsmOrg';
// 自定义弹出框
import YuXcustomRef from '@/components/widgets/xwidgets/YuXcustomRef';
// 财报组件
import YufpCalcformula1 from '@/components/widgets/fincReport/calcFormula1';
import YufpCalcformula3 from '@/components/widgets/fincReport/calcFormula3';
import YufpCheckformula from '@/components/widgets/fincReport/checkFormula';

// 广州银行
import YuOrgList from '@/components/widgets/YuOrgList';

// import YuwpBuiAce from 'yuwp-bui-ace'
Vue.component(YuToolbar.name, YuToolbar);
Vue.component(YuPanel.name, YuPanel);
Vue.component(YuFormButtons.name, YuFormButtons);
Vue.component(YuToolBar.name, YuToolBar);
Vue.component(YufpIndustrySelector.name, YufpIndustrySelector);
Vue.component(YuIndustryClassfy.name, YuIndustryClassfy);
Vue.component(YufpSelectUser.name, YufpSelectUser);
Vue.component(YufpFrameList.name, YufpFrameList);
Vue.component(YufpLmtcusSelector.name, YufpLmtcusSelector);
Vue.component(YufpLmtcollabSelector.name, YufpLmtcollabSelector);
Vue.component(YufpLmtgroupSelector.name, YufpLmtgroupSelector);
Vue.component(YufpDropDownTable.name, YufpDropDownTable);
Vue.component(YufpProductSelector.name, YufpProductSelector);
Vue.component(YufpEditTable.name, YufpEditTable);
Vue.component(YufpDemoSelector.name, YufpDemoSelector);
Vue.component(YufpZrcSelector.name, YufpZrcSelector);
Vue.component(YufpOrgTree.name, YufpOrgTree);
Vue.component(YufpUserSelector.name, YufpUserSelector);
Vue.component(YufpWordCloud.name, YufpWordCloud);
Vue.component(YufpSearchTree.name, YufpSearchTree);
Vue.component(YufpPasswordModify.name, YufpPasswordModify);

Vue.component(YufpNwfInit.name, YufpNwfInit);
Vue.component(YufpNwfSubmit.name, YufpNwfSubmit);
Vue.component(YuWorkflow.name, YuWorkflow);
Vue.component(YufpUserSelectDialog.name, YufpUserSelectDialog);
Vue.component(YufpCopyUserSelector.name, YufpCopyUserSelector);
Vue.component(YufpNodeScriptEditor.name, YufpNodeScriptEditor);
Vue.component(YufpSubIdSelector.name, YufpSubIdSelector);
// Vue.component(YuCustomForm.name, YuCustomForm);
// Vue.component(YuCustomList.name, YuCustomList);
Vue.component(YuXaccount.name, YuXaccount);
Vue.component(YuXbank.name, YuXbank);
Vue.component(YuXbankName.name, YuXbankName);
Vue.component(YuXbinsRule1.name, YuXbinsRule1);
Vue.component(YuXbinsRule2.name, YuXbinsRule2);
Vue.component(YuXcalu.name, YuXcalu);
Vue.component(YuXchkFormula.name, YuXchkFormula);
Vue.component(YuXchnlMrg.name, YuXchnlMrg);
Vue.component(YuXcltrlBase.name, YuXcltrlBase);
Vue.component(YuXcltrlBase1.name, YuXcltrlBase1);
Vue.component(YuXcltrlBase2.name, YuXcltrlBase2);
Vue.component(YuXcltrlBase3.name, YuXcltrlBase3);
Vue.component(YuXcontTpl.name, YuXcontTpl);
Vue.component(YuXcoopCtr.name, YuXcoopCtr);
Vue.component(YuXcoopProto.name, YuXcoopProto);
Vue.component(YuXcreditBook.name, YuXcreditBook);
Vue.component(YuXcreditProto1.name, YuXcreditProto1);
Vue.component(YuXcreditProto2.name, YuXcreditProto2);
Vue.component(YuXcreditProto3.name, YuXcreditProto3);
Vue.component(YuXcustom.name, YuXcustom);
Vue.component(YuXauthbook.name, YuXauthbook);
Vue.component(YuXcusBase.name, YuXcusBase);
Vue.component(YuXdataFlow.name, YuXdataFlow);
Vue.component(YuXdebtList.name, YuXdebtList);
Vue.component(YuXetrsCst1.name, YuXetrsCst1);
Vue.component(YuXetrsCst2.name, YuXetrsCst2);
Vue.component(YuXfinace.name, YuXfinace);
Vue.component(YuXfinaceCredit.name, YuXfinaceCredit);
Vue.component(YuXfinaceOrg.name, YuXfinaceOrg);
Vue.component(YuXfinApply.name, YuXfinApply);
Vue.component(YuXflexQuery.name, YuXflexQuery);
Vue.component(YuXflexQueryDetls.name, YuXflexQueryDetls);
Vue.component(YuXflexQueryGrp.name, YuXflexQueryGrp);
Vue.component(YuXflow.name, YuXflow);
Vue.component(YuXflowDefine.name, YuXflowDefine);
Vue.component(YuXfunc.name, YuXfunc);
Vue.component(YuXgrpMember.name, YuXgrpMember);
Vue.component(YuXloanCont.name, YuXloanCont);
Vue.component(YuXloan.name, YuXloan);
Vue.component(YuXloanProto.name, YuXloanProto);
Vue.component(YuXmodelFactory.name, YuXmodelFactory);
Vue.component(YuXorg.name, YuXorg);
Vue.component(YuRunInstance.name, YuRunInstance);
Vue.component(YuXorgQuery.name, YuXorgQuery);
Vue.component(YuXoutorgList.name, YuXoutorgList);
Vue.component(YuXoutorgMrg.name, YuXoutorgMrg);
Vue.component(YuXprdMrg.name, YuXprdMrg);
Vue.component(YuXproduct.name, YuXproduct);
Vue.component(YuXreportMrg.name, YuXreportMrg);
Vue.component(YuXrulesetinfo.name, YuXrulesetinfo);
Vue.component(YuXruleLibrary.name, YuXruleLibrary);
Vue.component(YuXtaskpoolOrg.name, YuXtaskpoolOrg);
Vue.component(YuXtaskpoolPerson.name, YuXtaskpoolPerson);
Vue.component(YuXtaskpoolPost.name, YuXtaskpoolPost);
Vue.component(YuXtaskpoolRule.name, YuXtaskpoolRule);
Vue.component(YuXtplSimp.name, YuXtplSimp);
Vue.component(YuXtreeDic.name, YuXtreeDic);
Vue.component(YuXunpay.name, YuXunpay);
Vue.component(YuXuplodList.name, YuXuplodList);
Vue.component(YuXuser.name, YuXuser);
Vue.component(YuXuser2.name, YuXuser2);
Vue.component(YuXuser3.name, YuXuser3);
Vue.component(YuXusero.name, YuXusero);
Vue.component(YuXuserPower.name, YuXuserPower);
Vue.component(YuXwfIns.name, YuXwfIns);
Vue.component(AccEntrustLoan.name, AccEntrustLoan); // 委托贷款台账
Vue.component(YuXuserForDh.name, YuXuserForDh); // 投贷后责任人选取列表
Vue.component(YuXorgForDh.name, YuXorgForDh); // 投贷后责任机构选取列表

Vue.component(YuYhlv.name, YuYhlv);

// 张家港列表弹出框
Vue.component(YuXprdMrgInfo.name, YuXprdMrgInfo);
Vue.component(YuXpersonalInfo.name, YuXpersonalInfo);
Vue.component(YuXcreditQuery.name, YuXcreditQuery);
Vue.component(YuXintbank.name, YuXintbank);
Vue.component(YuXloadnObj.name, YuXloadnObj);
Vue.component(YuXtestPrd.name, YuXtestPrd);
Vue.component(YuXlstGlf.name, YuXlstGlf);
Vue.component(YuXcoopInfo.name, YuXcoopInfo);
Vue.component(YuXintbankList.name, YuXintbankList);
Vue.component(YuXcoopAcct.name, YuXcoopAcct);
Vue.component(YuXyndInfo.name, YuXyndInfo);
Vue.component(YuXpersonalTemp.name, YuXpersonalTemp);
Vue.component(YuXloanExt.name, YuXloanExt);
Vue.component(YuXintbankModify.name, YuXintbankModify);
Vue.component(YuXprjAcct.name, YuXprjAcct);
Vue.component(YuXcoopApply.name, YuXcoopApply);
Vue.component(YuXcusnumQuery.name, YuXcusnumQuery);
Vue.component(YuXlstYnd.name, YuXlstYnd);
Vue.component(YuXcoopCustom.name, YuXcoopCustom);
Vue.component(YuXgrpList.name, YuXgrpList);
Vue.component(YuXsocialRelate.name, YuXsocialRelate);
Vue.component(YuXbailInfo.name, YuXbailInfo);
Vue.component(YuXcoopPlan.name, YuXcoopPlan);
Vue.component(YuXcoopPlanAcc.name, YuXcoopPlanAcc);
Vue.component(YuXcoopPartnerAgr.name, YuXcoopPartnerAgr);
Vue.component(YuXpersonalBaseInfo.name, YuXpersonalBaseInfo);
Vue.component(YuXlstCustom.name, YuXlstCustom);
Vue.component(YuXgrpCustom.name, YuXgrpCustom);
Vue.component(YuXcusManager.name, YuXcusManager);
Vue.component(YuXapptMgr.name, YuXapptMgr);
Vue.component(YuXinbankAcct.name, YuXinbankAcct);
Vue.component(YuXcstContact.name, YuXcstContact);
Vue.component(YuXguarMax.name, YuXguarMax);
Vue.component(YuXguareClost.name, YuXguareClost);
Vue.component(YuXguarCont.name, YuXguarCont);
Vue.component(YuXiaoWei.name, YuXiaoWei);
Vue.component(YuRetail.name, YuRetail);
Vue.component(YuXwPrdPop.name, YuXwPrdPop);
Vue.component(YuXwPvpOrgFk.name, YuXwPvpOrgFk);
Vue.component(YuXwPvpOrgZw.name, YuXwPvpOrgZw);
Vue.component(YuXwydTask.name, YuXwydTask);
Vue.component(YuXctrContAspl.name, YuXctrContAspl);
Vue.component(YuPvpAccpAppPop.name, YuPvpAccpAppPop);
Vue.component(YuRetailProduct.name, YuRetailProduct);
Vue.component(YuDgPrdPop.name, YuDgPrdPop);
Vue.component(YuDgCtrPop.name, YuDgCtrPop);
Vue.component(YuGuarntr.name, YuGuarntr);
Vue.component(YuGuar.name, YuGuar);
Vue.component(YuGuarBaseInfoRetail.name, YuGuarBaseInfoRetail);
Vue.component(YuXwPvpOrgQf.name, YuXwPvpOrgQf);
Vue.component(YuXwPvpOrgCd.name, YuXwPvpOrgCd);
Vue.component(IqpLoanAppRetail.name, IqpLoanAppRetail);

// 树弹出框
Vue.component(YuXdicTree.name, YuXdicTree);
Vue.component(YuXdicTreeAddr.name, YuXdicTreeAddr);
Vue.component(YuXdicTreeAddr2.name, YuXdicTreeAddr2);
Vue.component(YuXlmtsubTree.name, YuXlmtsubTree);
Vue.component(YuXorgTree.name, YuXorgTree);
Vue.component(YuXstdGb.name, YuXstdGb);
Vue.component(YuXgreenIndu.name, YuXgreenIndu);
Vue.component(YuXguarClass.name, YuXguarClass);
Vue.component(YuXprdCatalog.name, YuXprdCatalog);
Vue.component(YuXaddr.name, YuXaddr);
Vue.component(YuXmtablConf.name, YuXmtablConf);
Vue.component(YuXprdTree.name, YuXprdTree);
Vue.component(YuXsmOrg.name, YuXsmOrg);
// 自定义弹出框
Vue.component(YuXcustomRef.name, YuXcustomRef);
// 财报组件
Vue.component(YufpCalcformula1.name, YufpCalcformula1);
Vue.component(YufpCalcformula3.name, YufpCalcformula3);
Vue.component(YufpCheckformula.name, YufpCheckformula);

// 广州银行
Vue.component(YuOrgList.name, YuOrgList);
