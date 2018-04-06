<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <header class="hmt hmb">
                    <h1>Settings</h1>
                </header>
            </div>
        </div>
        <div class="row settings">
            <div class="col-12">
                <p>Select your audio profile.</p>
                <form v-on:change.prevent="set_profile">
                    <div class="form-group">
                        <select class="form-control" name="profile" ref="profile" v-model="selected_profile">
                            <option v-for="option in options" v-bind:value="option" v-bind:key="option">{{ option | capitalize }}</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="col-12">
                <p>Click the button below if you wish to restart the device.</p>
                <a href="javascript:void(0)" v-on:click="reboot" class="btn btn-outline-warning" data-action="reboot">Reboot</a>
            </div>
        </div>
    </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        selected_profile: 'flat',
        options: [
          'flat',
          'classical',
          'club',
          'dance',
          'large_hall',
          'live',
          'party',
          'pop',
          'reggae',
          'rock',
          'soft_rock',
          'soft',
          'techno'
        ]
      }
    },
    created () {
      axios.get(process.env.API + '/settings/profile/get')
        .then(response => {
          this.selected_profile = response.data
        })
        .catch(e => {
          console.log(e)
        })
    },
    methods: {
      set_profile: function () {
        let profile = this.$refs.profile.value
        if (profile) {
          axios.post(process.env.API + '/settings/profile/set', {
            profile: profile
          })
            .then(response => {
              console.log(response)
            })
            .catch(e => {
              console.log(e)
            })
        }
      },
      reboot: function () {
        //
      }
    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString().replace('_', ' ')
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
  }
</script>

<style scoped>
</style>
