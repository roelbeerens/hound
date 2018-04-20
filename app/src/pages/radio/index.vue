<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <header class="hmt hmb">
                    <h1>Radio</h1>
                </header>
                <form class="stations-search d-flex" v-on:submit.prevent="search">
                    <input name="search" class="form-control" type="search" placeholder="Search" aria-label="Search" ref="query">
                </form>
                <div class="row stations" v-if="favorites[0] && !searching">
                    <div class="col-12">
                        <header class="hmt hmb">
                            <h3>Favorites</h3>
                        </header>
                    </div>
                    <div class="col-md-6 station" v-for="(favorite) in favorites" :key="favorite.body[0].guide_id">
                        <div class="d-flex">
                            <figure class="station__image">
                                <div class="station__image--inner">
                                    <img :src="favorite.body[0].logo" class="station__image-blur"/>
                                    <img :src="favorite.body[0].logo"/>
                                </div>
                            </figure>
                            <div class="stations__content">
                                <header>
                                    <h5 class="text-truncate">{{ favorite.body[0].call_sign }}</h5>
                                    <p class="text-muted text-truncate small">{{ favorite.body[0].slogan }}</p>
                                </header>
                                <footer>
                                    <button v-on:click="play" :data-guide-id="favorite.body[0].guide_id" class="station__play btn btn-sm btn-dark">
                                        Play
                                    </button>
                                    <button v-on:click="favorite_remove" :data-guide-id="favorite.body[0].guide_id" class="station__favorite-remove btn btn-sm btn-danger">
                                        <icon name="trash-alt"></icon>
                                    </button>
                                </footer>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row stations" v-if="stations">
                    <div class="col-12">
                        <header class="hmt hmb">
                            <h3>Stations</h3>
                        </header>
                    </div>
                    <div class="col-md-6 station" v-for="(station) in stations" :key="station.guide_id" v-if="station.item === 'station'">
                        <div class="d-flex">
                            <figure class="station__image">
                                <div class="station__image--inner">
                                    <img :src="station.image" class="station__image-blur"/>
                                    <img :src="station.image"/>
                                </div>
                            </figure>
                            <div class="stations__content">
                                <header>
                                    <h5 class="text-truncate">{{ station.text }}</h5>
                                    <p class="text-muted text-truncate small">{{ station.subtext }}</p>
                                </header>
                                <footer>
                                    <button v-on:click="play" :data-guide-id="station.guide_id" class="station__play btn btn-sm btn-dark">
                                        Play
                                    </button>
                                    <button v-on:click="favorite_add" :data-guide-id="station.guide_id" class="station__favorite btn btn-sm btn-primary">
                                        <icon name="heart"></icon>
                                    </button>
                                </footer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        searching: false,
        stations: [],
        favorites: []
      }
    },
    created () {
      axios.get(process.env.API + '/radio/stations')
        .then(response => {
          this.stations = response.data
        })
        .catch(e => {
          console.log(e)
        })

      axios.get(process.env.API + '/radio/favorites')
        .then(response => {
          this.favorites = response.data
        })
        .catch(e => {
          console.log(e)
        })
    },
    methods: {
      favorite_add: function (event) {
        if (event.currentTarget.dataset.guideId) {
          axios.post(process.env.API + '/radio/stations/favorite/add', {
            guide_id: event.currentTarget.dataset.guideId
          })
            .then(response => {
              this.favorites = response.data
            })
            .catch(e => {
              console.log(e)
            })
        }
      },
      favorite_remove: function (event) {
        if (event.currentTarget.dataset.guideId) {
          axios.post(process.env.API + '/radio/stations/favorite/remove', {
            guide_id: event.currentTarget.dataset.guideId
          })
            .then(response => {
              this.favorites = response.data
            })
            .catch(e => {
              console.log(e)
            })
        }
      },
      play: function (event) {
        if (event.currentTarget.dataset.guideId) {
          axios.post(process.env.API + '/radio/play', {
            guide_id: event.currentTarget.dataset.guideId
          })
            .then(response => {
              console.log(response.data)
            })
            .catch(e => {
              console.log(e)
            })
        }
      },
      search: function () {
        let query = this.$refs.query.value
        if (query) {
          axios.post(process.env.API + '/radio/search', {
            query: query
          })
            .then(response => {
              this.searching = true
              this.stations = response.data
            })
            .catch(e => {
              console.log(e)
            })
        } else {
          axios.get(process.env.API + '/radio/stations')
            .then(response => {
              this.searching = false
              this.stations = response.data
            })
            .catch(e => {
              console.log(e)
            })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
    .stations-search {
        margin-top: 1.5rem;
    }

    .stations:last-child {
        margin-bottom: 1rem;
    }

    .station {
        .station__image {
            padding: 0.5rem;
            height: 80px;
            min-width: 80px;
            max-width: 80px;
            border-radius: 1rem;
            position: relative;
            overflow: hidden;
            margin-right: 1rem;
            background: #262528;
            border: none;
            box-shadow: 0 0 15px rgba(black, .1);

            .station__image--inner {
                height: 100%;
                display: flex;
                align-items: center;
            }

            @media (min-width: 576px) {
                padding: 1rem;
                height: 100px;
                min-width: 100px;
                max-width: 100px;
            }

            img {
                width: 100%;
                position: relative;
                z-index: 2;
                border-radius: 1rem;
                display: inline-block;
            }

            &-blur {
                filter: blur(1rem);
                opacity: 0.8;
                position: absolute !important;
                top: 50%;
                left: 50%;
                width: 150% !important;
                height: 150% !important;
                background-position: center center;
                background-size: cover;
                transform: translate(-50%, -50%);
            }
        }
        .stations__content {
            border-bottom: 1px solid rgba(#434248, .5);
            margin-bottom: 1rem;
            width: 100%;
            overflow: hidden;

            header {
                h5 {
                    font-size: 1rem;
                    margin-bottom: .25rem;

                    @media (min-width: 576px) {
                        font-size: 1.25rem;
                        margin-bottom: .5rem;
                    }
                }

                .text-muted {
                    color: #4b4a50 !important;
                }

                p {
                    margin-bottom: .5rem;

                    @media (min-width: 576px) {
                        margin-bottom: 1rem;
                    }
                }
            }

            footer {
                margin-bottom: 1rem;
            }
        }
    }

    .station__play {
        text-transform: uppercase;
        font-weight: 700;
        color: #4b4a50;
    }

    .station__favorite-remove,
    .station__favorite {
        text-transform: uppercase;
        font-weight: 700;
        margin-left: .5rem;
    }
</style>
