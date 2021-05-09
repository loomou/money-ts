let id: number = parseInt(window.localStorage.getItem('_recordIdMax') || '0') || 0;

function listId() {
  id++;
  window.localStorage.setItem('_recordIdMax', id.toString());
  return id;
}

export default listId;
