// @ts-ignore
import defaultRecord from '../constant/defaultRecord.js';
// @ts-ignore
import clone from '../libs/clone.ts';
// @ts-ignore
import listId from '../libs/listId.ts';
// @ts-ignore
import router from '../router';
import {Record, recordStoreState} from '@/interfaces/details';


const state = () => ({
  recordList: [],
  currentList: {icon: '-1', note: '', type: 'pay', amount: 0, createdAt: new Date(), id: ''},
  filterList: [],
  setRecord: {icon: '-1', note: '', type: 'pay', amount: 0, createdAt: new Date(), id: ''},
  staType: 'pay',
  staDate: new Date(),
  headerDate: new Date(),
  tagsShow: false,
  xxx: [],
  filterType: 'All',
  filterDate: new Date(),
}) as recordStoreState;

const mutations = {

  //获取数据
  fetchRecords(state: recordStoreState) {
    state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]');
    if (state.recordList.length === 0) {
      state.recordList = defaultRecord;
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    }
    return state.recordList;
  },

  //保存数据
  createRecord(state: recordStoreState, record: Record) {
    const record2 = clone(record);
    const id = listId().toString();
    record2.createdAt = record2.createdAt || new Date().toISOString();
    record2.id = id;
    state.recordList.push(record2);
    window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
  },

  //编剧数据
  updateRecord(state: recordStoreState, updateRecord: Record) {
    const recordId = updateRecord.id;
    state.currentList = updateRecord;
    let setRecord = state.recordList.filter(t => t.id === recordId)[0];
    setRecord.id = updateRecord.id;
    setRecord.icon = updateRecord.icon;
    setRecord.type = updateRecord.type;
    setRecord.createdAt = updateRecord.createdAt;
    setRecord.amount = updateRecord.amount;
    setRecord.note = updateRecord.note;
    window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
  },

  removeList(state: recordStoreState, id: String | number) {
    let index = -1;
    for (let i = 0; i < state.recordList.length; i++) {
      if (state.recordList[i].id === id) {
        index = i;
        break;
      }
    }
    if (index >= 0) {
      state.recordList.splice(index, 1);
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
      router.push('/detailed');
    }
  },

  modifyRecord(state: recordStoreState, payload: { id: String, type: string }) {
    let modifyList = state.recordList.filter(t => t.icon === payload.id);
    for (let i = 0; i < modifyList.length; i++) {
      if (payload.type === 'pay') {
        modifyList[i].icon = '-20';
      } else {
        modifyList[i].icon = '-21';
      }
    }
    window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
  },

  //读取需要编辑的数据
  setCurrentRecord(state : recordStoreState, id: string | number) {
    state.currentList = state.recordList.filter(t => t.id === id)[0];
  },

  cloneCurrentList(state : recordStoreState) {
    state.setRecord = clone(state.currentList);
  },

  //初始化数据
  clearRecord(state : recordStoreState) {
    state.setRecord = {icon: '-1', note: '', type: 'pay', amount: 0, createdAt: new Date(), id: ''};
  },

  //需要保存的数据
  setNote(state : recordStoreState, note: string) {
    state.setRecord.note = note;
  },

  setDate(state : recordStoreState, date: Date | string) {
    state.setRecord.createdAt = date;
  },

  setIcon(state : recordStoreState, icon: string) {
    state.setRecord.icon = icon;
  },

  setAmount(state : recordStoreState, amount: number) {
    state.setRecord.amount = amount;
  },

  setType(state : recordStoreState, type:string) {
    state.setRecord.type = type;
  },

  //查看对应月份收支
  queryMonth(state : recordStoreState, month: Date | string) {
    state.filterDate = month;
    state.headerDate = month;
  },

  //查看对应类型收支
  queryType(state : recordStoreState, type: string) {
    state.filterType = type;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
};
