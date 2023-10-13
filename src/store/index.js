import { createStore } from 'vuex'

export default createStore({
  state: {
    data: [
      {
        from: 0,
        to: 6,
        audio: 'otkryitie1.mp3',
        duration: 6
      },
      {
        from: 6,
        to: 9,
        audio: 'video2.mp3',
        duration: 3
      },
      {
        from: 9,
        to: 10,
        audio: 'korotkaya3.mp3',
        duration: 1
      },
      {
        from: 10,
        to: 16,
        audio: 'otkryitie1.mp3',
        duration: 6
      },
      {
        from: 16,
        to: 22,
        audio: 'otkryitie1.mp3',
        duration: 6
      },
    ]
  },
  getters: {
    getData: state => state.data,
  },
})
