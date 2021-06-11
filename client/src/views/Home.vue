<template>
<v-container>
  <v-open-auth class="buttonAuth"></v-open-auth>
  <v-pagination :page="page" @pageClicked="pageEvent"></v-pagination>
  <v-slide-group></v-slide-group>
</v-container>
</template>

<script>
import SlideGroupIndex from '../components/SlideGroup/SGIndex.vue';
import Pagination from '../components/Shared/Pagination.vue';
import OpenAuth from '../components/AuthComponents/OpenAuth.vue';

export default {
  name: 'Home',
  components: {
    'v-slide-group': SlideGroupIndex,
    'v-pagination': Pagination,
    'v-open-auth': OpenAuth,
  },
  data: () => ({
    page: 3,
  }),
  methods: {
    pageEvent(data) {
      console.log('en home', data);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
