import * as yup from 'yup';

export const createTodoSchema = yup.object().shape({
  name: yup.string().required(),
});
