<template>
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)" />

    <van-search
      readonly
      shape="round"
      background="#ffffff"
      :value="querySearch||'搜索商品'"
      show-action
      @click="$router.push('/search')"

    >
      <template #action>
        <!-- <van-icon class="tool" name="apps-o" /> -->
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <div class="sort-item" @click="sortBy('all')" :class="{active:sortType==='all'}">综合</div>
      <div class="sort-item" @click="sortBy('sales')" :class="{active:sortType==='sales'}">销量</div>
      <div class="sort-item price-sort":class="{ active: sortType === 'price' }" @click="togglePriceSort('price')" >
        价格
         <div class="icons">
          <div class="iconfont icon-shang" :class="{ active: sortType === 'price' && !sortPrice }"></div>
          <div class="iconfont icon-xia" :class="{ active: sortType === 'price' && sortPrice }"></div>
        </div>
       </div>
    </div>

    <div class="goods-list">
      <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getProList } from '@/api/product.js'
export default {
  name: 'SearchIndex',
  components: {
    GoodsItem
  },
  data () {
    return {
      page: 1,
      proList: [],
      sortType:'all',  //默认行为
      sortPrice:0
    }
  },
  computed: {
    querySearch () {
      return this.$route.query.search
    }
  },
  methods:{
    async fetchProductList(){
      const { data: { list } } = await getProList({
        sortType:this.sortType,
        sortPrice:this.sortPrice,
        categoryId: this.$route.query.categoryId,
        goodsName: this.querySearch,
        page: this.page
      })
      
      this.proList = list.data
    
    },
     // 按照类型排序
    sortBy(type) {
      this.sortType = type
 
      this.fetchProductList()
    },
    // 切换价格排序
    togglePriceSort(type) {
      this.sortType = type // 设置为价格排序
      this.sortPrice = this.sortPrice === 0 ? 1 : 0 // 切换升序/降序
      this.fetchProductList()
    },
  },


  async created () {
   this.fetchProductList()
  }
}
</script>

<style lang="less" scoped>
.search {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
      cursor:pointer;
      &.active{
        color:rgb(216, 81, 135)
      }
    }
      /* 价格排序部分 */
    .price-sort {
      display: flex;
      align-items: center;
      justify-content: center;
      .icons {
        margin-left: 4px; /* 增加与“价格”文字的间距 */
      }
      .iconfont {
        font-size: 12px; /* 控制箭头图标的大小 */
        line-height: 12px;
        color: #333;
      }
      .icon-shang.active {
        color:rgb(216, 81, 135); /* 选中升序时箭头变红 */
      }
      .icon-xia.active {
        color: rgb(216, 81, 135); /* 选中降序时箭头变红 */
      }
    }
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}


// 字体图标
@font-face {
  font-family: "iconfont"; /* Project id 4692320 */
  src: url('//at.alicdn.com/t/c/font_4692320_jn7zuzqaws.woff2?t=1727075259707') format('woff2'),
       url('//at.alicdn.com/t/c/font_4692320_jn7zuzqaws.woff?t=1727075259707') format('woff'),
       url('//at.alicdn.com/t/c/font_4692320_jn7zuzqaws.ttf?t=1727075259707') format('truetype');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-shang:before {
  content: "\e63c";
}

.icon-xia:before {
  content: "\e63d";
}
</style>
