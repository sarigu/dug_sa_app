import {
    TEACHERS_LOADED_FAIL,
    TEACHERS_LOADED_SUCCESS,
    NEW_TEACHERS_LOADED_FAIL,
    NEW_TEACHERS_LOADED_SUCCESS,
    BOOKMARKED_TEACHERS_LOADED_SUCCESS,
    BOOKMARKED_TEACHERS_LOADED_FAIL,
    ADD_BOOKMARK_SUCCESS,
    ADD_BOOKMARK_FAIL,
    UPDATED_TEACHERS
} from '../actions/types';

const initialState = {
    teachers: [],
    newTeachers: [],
    bookmarkedTeachers: [],
    bookmarksUpdated: false,
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case TEACHERS_LOADED_SUCCESS:
            function arrayUnique(array) {
                var a = array.concat();
                for (var i = 0; i < a.length; ++i) {
                    for (var j = i + 1; j < a.length; ++j) {
                        if (a[i].user.id === a[j].user.id)
                            a.splice(i--, 1);
                    }
                }

                return a;
            }

            let new_teachers_list = arrayUnique(state.teachers.concat(payload));
            //is payload item in state.teacher
            //if not add it
            console.log("new teachers list", new_teachers_list)

            return {
                ...state,
                teachers: new_teachers_list
            }
        case TEACHERS_LOADED_FAIL:
            return {
                ...state,
            }
        case NEW_TEACHERS_LOADED_SUCCESS:
            return {
                ...state,
                newTeachers: payload
            }
        case NEW_TEACHERS_LOADED_FAIL:
            return {
                ...state,
            }
        case BOOKMARKED_TEACHERS_LOADED_SUCCESS:
            return {
                ...state,
                bookmarkedTeachers: payload
            }
        case BOOKMARKED_TEACHERS_LOADED_FAIL:
            return {
                ...state,
            }
        case ADD_BOOKMARK_SUCCESS:
            return {
                ...state,
                bookmarksUpdated: true
            }
        case ADD_BOOKMARK_FAIL:
            return {
                ...state,
            }
        case UPDATED_TEACHERS:
            return {
                ...state,
                bookmarksUpdated: false
            }
        default:
            return state
    }
};