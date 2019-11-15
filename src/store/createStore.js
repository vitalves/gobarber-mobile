import { createStore, compose, applyMiddleware } from 'redux';

export default (reducers, middlewares) => {
  // Reactotron
  const enhancer =
    process.env.NODE_ENV === 'development'
      ? compose(
          console.tron.createEnhancer(),
          applyMiddleware(...middlewares)
        )
      : applyMiddleware(...middlewares);

  // return createStore(reducers, middlewares); // sem uso de reactotron
  return createStore(reducers, enhancer);
};
