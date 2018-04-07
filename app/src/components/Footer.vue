<template>
    <nav class="navbar fixed-bottom navbar-light bg-light controls" v-bind:class="{ playing : now_playing }">
        <div class="controls__np">
            <div class="container text-truncate">
                <a class="text-muted"><icon name="play"></icon> Now Playing:</a>
                <span>{{ now_playing }}</span>
            </div>
        </div>
        <div class="container">
            <div class="d-flex">
                <div class="mr-auto d-flex controls__buttons">
                    <a href="javascript:void(0)" v-on:click="stop" class="controls__buttons-stop">
                        <icon name="stop"></icon>
                    </a>
                    <a href="javascript:void(0)" v-on:click="mute" class="controls__buttons-mute">
                        <span v-if="!mute_status">
                            <icon name="volume-up"></icon>
                        </span>
                        <span v-if="mute_status">
                            <icon name="volume-off"></icon>
                        </span>
                    </a>
                </div>
                <div class="controls__volume">
                    <input type="range" min="1" max="100" :value="current_volume" name="volume" class="controls__buttons-volume" id="volume" v-on:change="volume">
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        now_playing: null,
        current_volume: 20,
        mute_status: false
      }
    },
    mounted: function () {
      this.getStatus()
      let self = this
      setInterval(function () {
        self.getStatus()
      }, 5000)
    },
    methods: {
      getStatus: function () {
        axios.get(process.env.API + '/player/status')
          .then(response => {
            this.current_volume = response.data.volume
            if (response.data['media-title']) {
              if (response.data['media-title'].includes('mp3')) {
                this.now_playing = 'Fetching Information...'
              } else {
                this.now_playing = response.data['media-title'].toLowerCase()
              }
            } else {
              this.now_playing = null
            }
          })
          .catch(e => {
            console.log(e)
          })
      },
      stop: function () {
        axios.post(process.env.API + '/player/stop')
          .then(response => {
            if (response.data[0].status === 'stopped') {
              this.now_playing = null
            }
          })
          .catch(e => {
            console.log(e)
          })
      },
      mute: function () {
        axios.post(process.env.API + '/player/mute')
          .then(response => {
            if (response.data[0].status === 'mute') {
              if (this.mute_status) {
                this.mute_status = false
              } else {
                this.mute_status = true
              }
            }
          })
          .catch(e => {
            console.log(e)
          })
      },
      volume: function (event) {
        axios.post(process.env.API + '/player/volume/set', {
          volume: event.target.value
        })
          .then(response => {
            console.log(response.data)
          })
          .catch(e => {
            console.log(e)
          })
      }
    }
  }
</script>

<style lang="scss">
    .controls {
        &.playing {
            .controls__np,
            .controls__buttons-stop {
                display: block !important;
            }

            ~ main {
                padding-bottom: 91px;
            }
        }
        .controls__np {
            position: absolute;
            bottom: 100%;
            width: 100%;
            left: 0;
            font-size: 13px;
            background: #f2f2f2;
            padding: 0 1rem;
            display: none;
            text-transform: capitalize;

            .fa-icon {
                font-size: 10px;
                margin-right: 0.5rem;
                margin-bottom: 3px;
            }
        }
        .fa-icon {
            width: auto;
            height: 1em;
            max-width: 100%;
            max-height: 100%;
            font-size: 16px;
        }
        .container {
            padding: 8px 0;
        }
        .d-flex {
            width: 100%;
            .controls__buttons {
                width: auto;
                .controls__buttons-stop {
                    padding-right: 15px;
                    display: none;
                    min-width: 32px;
                }
                .controls__buttons-mute {
                    padding-right: 15px;
                    min-width: 32px;
                    text-align: center;
                }
            }
        }
        .controls__volume {
            width: 100%;
            .controls__buttons-volume {
                -webkit-appearance: none;
                width: 100%;
                height: 10px;
                border-radius: 5px;
                background: #d3d3d3;
                outline: none;
                -webkit-transition: opacity .15s ease-in-out;
                transition: opacity .15s ease-in-out;
                &::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 20px;
                    height: 20px;
                    background: var(--primary);
                    cursor: pointer;
                    border-radius: 50%;
                    border: none;
                    outline: none;
                }
            }
        }
    }
</style>
