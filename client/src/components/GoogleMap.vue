<template>
  <div>
    <!-- <div>
      <label>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="addMarker">Add</button>
      </label>
      <br/>
    </div> -->
    <!-- <br> -->
    <GmapMap
      :center="center"
      :zoom=13
      class="initSize"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
    name: "GoogleMap",
    data() {
        return {
            // default to Montreal to keep it simple
            // change this to whatever makes sense
            center: { lat: 43.0481221, lng: -76.14742439999999 },
            markers: [],
            places: [],
            currentPlace: null
        };
    },

    mounted() {
        // this.geolocate(); // set current location as center
    },

    methods: {
        // receives a place object via the autocomplete component
        setPlace(place) {
            this.currentPlace = place;
        },
        addMarker() {
            if (this.currentPlace) {
                const marker = {
                lat: this.currentPlace.geometry.location.lat(),
                lng: this.currentPlace.geometry.location.lng()
                };
                this.markers.push({ position: marker });
                this.places.push(this.currentPlace);
                this.center = marker;
                this.currentPlace = null;
            }
        },
        geolocate: function() {
            navigator.geolocation.getCurrentPosition(position => {
                this.center = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
            });
        }
    }
};
</script>

<style scoped>
.initSize {
    width:100%;  
    height: 600px;
}
</style>