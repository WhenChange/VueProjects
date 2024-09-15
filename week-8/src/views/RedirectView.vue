<template>
  <div class="redirect-container">
    <h2>Please login first!</h2>
    <p>You will be redirected to the login page in <span class="countdown">{{ countdown }}</span> seconds.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countdown: 3
    }
  },
  mounted() {
    this.startCountdown()
  },
  methods: {
    startCountdown() {
      const timer = setInterval(() => {
        this.countdown--
        if (this.countdown <= 0) {
          clearInterval(timer)
          this.$router.push({ name: 'Login' }) //
        }
      }, 1000)
    }
  }
}
</script>

<style scoped>
.redirect-container {
  text-align: center;
  margin-top: 50px;
}
.countdown {
  color: red;
  font-size: 24px;
}
</style>
