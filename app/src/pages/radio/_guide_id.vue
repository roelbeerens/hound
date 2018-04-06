<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <header class="hmt hmb">
                    <h1>{{ station.call_sign }}</h1>
                    <h4>{{ station.slogan }}</h4>
                </header>
                <div class="row stations">

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
        station: []
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
    }
  }
</script>

<style scoped>
</style>
