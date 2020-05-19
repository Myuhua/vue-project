<template>
  <div class="login">
    <el-form ref="form" :model="form"  class="login-form">
      <h3 class="title">后台管理系统</h3>
      <el-form-item prop="username">
        <el-input v-model="form.username" type="text" auto-complete="off" placeholder="账号">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form.username"
          type="password"
          auto-complete="off"
          placeholder="密码"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2020-20-- yuhua All Rights Reserved.</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style >
  /*登录页样式*/
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    /*background-image: url("../../common/img/login-background.jpg");*/
    background-size: cover;
  }

  /*标题样式*/
  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #707070;
  }

  /*登录表单样式*/
  .login-form {
    border-radius: 6px;
    background: #ffffff;
    width: 400px;
    padding: 25px 25px 5px 25px;
  }

  /*底部样式*/
  .el-login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    /*color: #fff;*/
    font-family: Arial;
    font-size: 12px;
    letter-spacing: 1px;
  }
</style>
