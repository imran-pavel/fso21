import anecdotesServices from "../services/anecdotes";

export const createVoteAction = (id) => {
  return async (dispatch) => {

    let anecdotes = await anecdotesServices.getAll();
    const foundAnecdoteIndex = anecdotes.findIndex(anecdote => anecdote.id === id);
    if(foundAnecdoteIndex === -1) return;
    const foundAnecdote = anecdotes[foundAnecdoteIndex];
    await anecdotesServices.updateVote(id, foundAnecdote.votes + 1);
    anecdotes = await anecdotesServices.getAll();

    dispatch({
      type: 'VOTE',
      data: anecdotes
    });

  };
};

export const createAddNewNoteAction = (newAnecdote) => {
  return async (dispatch) => {
    const content = await anecdotesServices.createNewAnecdote(newAnecdote);
    dispatch({
      type: 'NEW_NOTE',
      data: content
    });
  };
};

export const createInitializeAction = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesServices.getAll();
    dispatch(
      {
        type: 'INITIALIZE',
        data: anecdotes
      }
    );
  };
};

const anecdotes = (state = [], action) => {

  const sortByVoteFn = (anec1, anec2) => {
    return -1 * (anec1.votes - anec2.votes);
  };

  let newAnecdotes;

  switch(action.type) {
    case 'VOTE':
      return action.data.sort(sortByVoteFn);
    case 'NEW_NOTE':
      newAnecdotes = state.concat(action.data);
      return newAnecdotes;
    case 'INITIALIZE':
      return action.data.sort(sortByVoteFn);
    default:
      return state;
  }
};

export const anecdoteStateName = 'anecdotes';
export default anecdotes;