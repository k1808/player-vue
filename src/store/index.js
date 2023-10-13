import { createStore } from 'vuex'

export default createStore({
  state: {
    data: [
      {
        from: 0,
        to: 5,
        audio: 'otkryitie1.mp3',
        duration: 6
      },


      {
        from: 6,
        to: 8,
        audio: 'video2.mp3',
        duration: 3
      },
      {
        from: 9,
        to: 10,
        audio: 'korotkaya3.mp3',
        duration: 1
      },
    ]
  },
  getters: {
    getData: state => state.data,
  },
})
