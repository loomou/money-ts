import clone from '../libs/clone';
import listId from '../libs/listId';
import router from '../router';
import {Record, recordStoreState} from '@/interfaces/details';
import dayjs from 'dayjs';
import {MutationTree, Module, GetterTree} from 'vuex';


const state: recordStoreState = {
  recordList: [],
  filterList: [],
  setRecord: {icon: '-1', note: '', type: 'pay', amount: 0, createdAt: new Date().toISOString(), id: ''},
  currentList: {icon: '-1', note: '', type: 'pay', amount: 0, createdAt: new Date().toISOString(), id: ''},
  staType: 'pay',
  staDate: new Date(),
  headerDate: new Date(),
  filterType: 'All',
  filterDate: new Date(),
};

const mutations: MutationTree<recordStoreState> = {
  //获取数据
  fetchRecords(state) {
    state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]');
    return state.recordList;
  },

  //保存数据
  createRecord(state, record: Record) {
    const record2 = clone(record);
    const id = listId().toString();
    record2.createdAt = record2.createdAt || new Date().toISOString();
    record2.id = id;
    state.recordList.push(record2);
    window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
  },

  //编剧数据
  updateRecord(state, updateRecord: Record) {
    state.currentList = updateRecord;
  },

  removeList(state, id: String | number) {
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

  modifyRecord(state, payload: { id: String, type: string }) {
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

  modifyCurrentRecord(state) {
    state.currentList = state.setRecord;
  },

  modifyStaDate(state) {
    state.staDate = new Date();
  },

  modifyStaType(state) {
    state.staType = 'pay';
  },

  modifyFilterType(state) {
    state.filterType = 'All';
  },

  modifyFilterDate(state) {
    state.filterDate = new Date().toISOString();
  },

  //读取需要编辑的数据
  setCurrentRecord(state, id: Record) {
    state.currentList = id;
  },

  cloneCurrentList(state) {
    state.setRecord = clone(state.currentList);
  },

  //初始化数据
  clearRecord(state) {
    state.setRecord = {icon: '-1', note: '', type: 'pay', amount: 0, createdAt: new Date(), id: ''};
  },

  //需要保存的数据
  setNote(state, note: string) {
    state.setRecord.note = note;
  },

  setDate(state, date: Date | string) {
    state.setRecord.createdAt = date;
  },

  setIcon(state, icon: string) {
    state.setRecord.icon = icon;
  },

  setAmount(state, amount: number) {
    state.setRecord.amount = amount;
  },

  setType(state, type: string) {
    state.setRecord.type = type;
  },

  //查看对应月份收支
  queryMonth(state, month: Date | string) {
    state.filterDate = month;
    state.headerDate = month;
  },

  //查看对应类型收支
  queryType(state, type: string) {
    state.filterType = type;
  }
};

const getters: GetterTree<recordStoreState, Record> = {
  filterTypeDate(state) {
    const ddd = clone(state.recordList);
    state.filterList = ddd.filter((t: Record) => {
      if (state.filterType === 'All') return true;
      return t.icon == state.filterType;
    }).filter((y: Record) => {
      if (dayjs(state.filterDate).isSame((new Date()), 'month')) return true;
      return dayjs(y.createdAt).isSame(dayjs(state.filterDate), 'month');
    }).sort((a: Record, b: Record) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    return state.filterList;
  },

  dateSort(state, getters) {
    const recordList = clone(getters.filterTypeDate as Record[]);
    if (recordList.length === 0) {
      return [];
    }
    const newList = clone(recordList);
    const dateList = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = dateList[dateList.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current);
      } else {
        dateList.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
      }
    }
    const monthList = [{title: dayjs(newList[0].createdAt).format('YYYY-MM'), items: [dateList[0]]}];
    for (let i = 1; i < dateList.length; i++) {
      const current = dateList[i];
      const last = monthList[monthList.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.title), 'month')) {
        last.items.push(current);
      } else {
        monthList.push({title: dayjs(current.title).format('YYYY-MM'), items: [current]});
      }
    }
    return monthList;
  },

  monthTotal(state, getters) {
    let qqq = 0, www = 0;
    const ttt = clone(getters.filterTypeDate as Record[]);
    if (ttt.length === 0) {
      state.headerDate = new Date();
      return {qqq, www};
    }
    state.headerDate = ttt[0].createdAt;
    const uuu = ttt.filter(t => dayjs(t.createdAt).isSame(ttt[0].createdAt, 'month'));
    const iii = uuu.filter(t => t.type === 'pay');
    const ooo = uuu.filter(t => t.type === 'income');
    for (let i = 0; i < iii.length; i++) {
      qqq = qqq + iii[i].amount;
    }
    for (let i = 0; i < ooo.length; i++) {
      www = www + ooo[i].amount;
    }
    return {qqq, www};
  }
};

export const RecordStore: Module<recordStoreState, Record> = {
  namespaced: true,
  state,
  mutations,
  getters
};
