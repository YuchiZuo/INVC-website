<template>
  <el-carousel :interval="interval" arrow="always" indicator-position="outside" @change="handleChange">
    <el-carousel-item v-for="(item, index) in items" :key="index">
      <img :src="require('@/assets/'+item.image)" alt="" class="carousel-item-image"  >
    </el-carousel-item>
  </el-carousel>

</template>

<script>

export default {
  name: 'Carousel',
  props: {
    items: {
      type: Array,
      required: true
    },
    interval: {
      type: Number,
      default: 5000
    },
  },
  methods: {
    handleChange(index) {
      console.log(`轮播图切换到第 ${index + 1} 张`)
    }
  }
}
</script>

<style scoped>
.carousel-item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/deep/.el-carousel__container {
  height: 500px !important;
}

.carousel-item-enter-active,
.carousel-item-leave-active {
  transition: all 0.5s;
}

.carousel-item-enter,
.carousel-item-leave-to {
  opacity: 0;
}
</style>
>