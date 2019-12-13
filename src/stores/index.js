import { registerStore, select } from "@wordpress/data";

const REPLACE = "REPLACE";
const CHANGE_PAGE = "CHANGE_PAGE";
const LIST_FETCH = "LIST_FETCH";

const initialState = {
  list: [],
  page: 1
};

const storeActions = {
  replace(list) {
    return {
      type: REPLACE,
      payload: list
    };
  },
  changePage(page) {
    return {
      type: CHANGE_PAGE,
      payload: page
    };
  },
  fetch(page) {
    return {
      type: LIST_FETCH,
      page
    };
  }
};

export default registerStore("liststore", {
  reducer(state = initialState, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case REPLACE:
        return {
          ...state,
          list: [...action.payload]
        };

      case CHANGE_PAGE:
        return {
          ...state,
          page: action.payload
        };
    }

    return state;
  },
  actions: storeActions,

  selectors: {
    getList(state) {
      return state.list;
    },
    getPage(state) {
      return state.page;
    }
  },

  controls: {
    async LIST_FETCH(action) {
      console.log("Calling LIST_FETCH with", action.page);
      return new Array(action.page).fill(0).map((q, i) => i + 1);
    }
  },

  resolvers: {
    getList: {
      *fulfill() {
        const page = select("liststore").getPage();
        const list = yield storeActions.fetch(page);
        return storeActions.replace(list);
      },
      shouldInvalidate: action => {
        return action.type === CHANGE_PAGE;
      }
    }
  }
});
