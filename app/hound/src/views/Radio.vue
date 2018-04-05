<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <header class="hmt hmb">
                    <h1>Radio</h1>
                </header>
                <form class="stations-search d-flex">
                    <input name="search" class="form-control mr-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success my-sm-0" type="submit">Search</button>
                </form>
                <div class="row stations">
                    <div class="col-md-6 station" v-for="(station) in stations" :key="station.guide_id">
                        <div class="card">
                            <div class="card-body">
                                <header>
                                    <h5>{{ station.text }}</h5>
                                </header>
                                <footer>
                                    <a href="javascript:void(0)" class="station__play btn btn-sm btn-primary">Play</a>
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
        stations: []
      }
    },
    created () {
      axios.get(process.env.API + '/radio/stations')
        .then(response => {
          this.stations = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
</script>

<style scoped>
</style>
