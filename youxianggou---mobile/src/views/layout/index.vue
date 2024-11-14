<template>
  <div>
    <!-- 二级组件展示位置 -->
    <router-view />

    <van-tabbar active-color="#f34e90" inactive-color="#000"  route>
    <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/category" icon="apps-o">分类页</van-tabbar-item>
    <van-tabbar-item to="/car" icon="shopping-cart-o">购物车</van-tabbar-item>
    <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
    }
  }
}
</script>

<style>

</style>
