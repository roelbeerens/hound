<template>
    <div class="container">
        <div class="station__image-blur--holder">
            <div class="station__image-blur" v-bind:style="{ backgroundImage: 'url(' + station.logo + ')' }"></div>
        </div>
        <div class="row">
            <div class="col-12">
                <header class="hmt hmb d-flex">
                    <h1>Radio</h1>
                    <div class="ml-auto">
                        <router-link to="/radio" class="btn-back btn btn-sm btn-dark">Back</router-link>
                    </div>
                </header>
                <div class="row station">
                    <div class="col-12">
                        <div class="d-flex stations__content--holder">
                            <figure class="station__image">
                                <div class="station__image--inner">
                                    <img :src="station.logo"/>
                                    <div class="icon" v-on:click="play" :data-guide-id="station.guide_id">
                                        <icon name="play"></icon>
                                    </div>
                                </div>
                            </figure>
                            <div class="stations__content">
                                <header>
                                    <h5>{{ station.call_sign }}</h5>
                                    <p v-if="station.slogan" class="text-muted text-truncate small">{{ station.slogan }}</p>
                                    <p v-else class="text-muted text-truncate small">{{ station.url }}</p>
                                </header>
                                <footer>
                                    <button v-on:click="play" :data-guide-id="station.guide_id" class="station__play btn btn-sm btn-dark">
                                        Play
                                    </button>
                                    <button v-if="! inArray(station.guide_id, favorites)" v-on:click="favorite_add" :data-guide-id="station.guide_id" class="station__favorite btn btn-sm btn-primary">
                                        <icon name="heart"></icon>
                                    </button>
                                    <button v-if="inArray(station.guide_id, favorites)" v-on:click="favorite_remove" :data-guide-id="station.guide_id" class="station__favorite-remove btn btn-sm btn-danger">
                                        <icon name="trash-alt"></icon>
                                    </button>
                                </footer>
                            </div>
                        </div>
                        <div class="station__information">
                            <header class="hmt hmb">
                                <h3>Information</h3>
                            </header>
                            <table class="table">
                                <tbody>
                                <tr v-if="station.location">
                                    <th scope="row">Location</th>
                                    <td class="text-truncate">{{ station.location }}</td>
                                </tr>
                                <tr v-if="station.genre_name">
                                    <th scope="row">Genres</th>
                                    <td class="text-truncate">{{ station.genre_name }}</td>
                                </tr>
                                <tr v-if="station.twitter_id">
                                    <th scope="row">Twitter</th>
                                    <td class="text-truncate">
                                        <a v-bind:href="'https://twitter.com/' + station.twitter_id" target="_blank">@{{
                                            station.twitter_id }}</a></td>
                                </tr>
                                <tr v-if="station.language">
                                    <th scope="row">Language</th>
                                    <td class="text-truncate">{{ station.language }}</td>
                                </tr>
                                <tr v-if="station.mailing_address">
                                    <th scope="row">Contact</th>
                                    <td class="text-truncate">{{ station.mailing_address }}</td>
                                </tr>
                                <tr v-if="station.url">
                                    <th scope="row">Website</th>
                                    <td class="text-truncate"><a v-bind:href="station.url" target="_blank">{{
                                        station.url }}</a></td>
                                </tr>
                                <tr v-if="station.email">
                                    <th scope="row">Email</th>
                                    <td class="text-truncate"><a v-bind:href="'mailto:' + station.email">{{
                                        station.email }}</a></td>
                                </tr>
                                </tbody>
                            </table>
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
        station: [],
        favorites: []
      }
    },
    created () {
      axios.get(process.env.API + '/radio/stations/' + this.$route.params.guide_id)
        .then(response => {
          this.station = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })

      axios.get(process.env.API + '/radio/favorites')
        .then(response => {
          for (let stationKey in response.data) {
            this.favorites.push(response.data[stationKey].body[0].guide_id)
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    methods: {
      inArray: function (needle, haystack) {
        let length = haystack.length
        for (let i = 0; i < length; i++) {
          if (haystack[i] === needle) return true
        }
        return false
      },
      favorite_add: function (event) {
        if (event.currentTarget.dataset.guideId) {
          axios.post(process.env.API + '/radio/stations/favorite/add', {
            guide_id: event.currentTarget.dataset.guideId
          })
            .then(response => {
              for (let stationKey in response.data) {
                this.favorites.push(response.data[stationKey].body[0].guide_id)
              }
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
      }
    }
  }
</script>

<style lang="scss" scoped>
    .station__image-blur--holder {
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 50vh;

        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 50%;
            background: linear-gradient(to bottom, transparent, #262528) !important;
        }

        .station__image-blur {
            filter: blur(50px);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
            opacity: .1;
        }
    }

    .station {
        .station__image {
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
            background-clip: padding-box;

            .station__image--inner {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;

                &:hover {
                    .icon {
                        opacity: 1;
                    }
                }

                .icon {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 2;
                    background-color: rgba(white, 0.9) !important;
                    width: 2.5rem;
                    height: 2.5rem;
                    border-radius: 50%;
                    opacity: 0;
                    cursor: pointer;
                    transition: opacity 0.3s linear;
                    box-shadow: 0 0 10px rgba(black, .1);

                    .fa-icon {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-40%, -50%);
                        z-index: 2;
                    }
                }
            }

            @media (min-width: 576px) {
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
                filter: blur(2rem);
                opacity: 0.8;
                position: absolute !important;
                top: 0;
                left: 0;
                width: 100% !important;
                height: 100% !important;
            }
        }
        .stations__content--holder {
            border-bottom: 1px solid rgba(#434248, .5);
        }
        .stations__content {
            width: 100%;
            overflow: hidden;

            header {
                h5 {
                    font-size: 1rem;
                    margin-bottom: .25rem;
                    font-weight: 700;

                    a {
                        color: inherit;
                        text-decoration: none;

                        &:hover {
                            color: #ccc;
                        }
                    }

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
                margin-bottom: 2rem;
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

    .station__information {
        overflow: hidden;

        h3 {
            font-weight: 700;
            margin-bottom: 2rem;
        }
        table {
            font-size: 80%;

            th,
            td {
                border-top: 1px solid rgba(#434248, .5);
            }

            th {
                padding-left: 0;
            }

            a {
                color: #ccc;
            }

            &:last-child {
                margin-bottom: 2rem;
            }

            @media (min-width: 576px) {
                font-size: 100%;
            }
        }
    }
</style>
