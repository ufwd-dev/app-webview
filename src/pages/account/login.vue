<template>

<f7-page name="login" id="login-page" color-theme="red">
	<f7-row>
		<f7-col style="margin-top: 5rem;">
			<img src="../../../build/logo.png" alt="logo">
		</f7-col>
	</f7-row>

	<f7-login-screen-title>登录</f7-login-screen-title>

	<f7-list no-hairlines-md>
		<f7-list-item>
			<f7-label>手机</f7-label>
			<f7-input
				placeholder="手机号"
				type="text"
				:value="account.name"
				@input="account.name = $event.target.value"
				clear-button>
			</f7-input>
		</f7-list-item>
		<f7-list-item>
			<f7-label>密码</f7-label>
			<f7-input
				placeholder="密码" 
				type="password"
				:value="account.password"
				@input="account.password = $event.target.value"
				clear-button>
			</f7-input>
		</f7-list-item>
	</f7-list>
	<f7-block inset class="action-area">
		<f7-row>
			<f7-col>
				<f7-button fill @click="signIn">登录</f7-button>
			</f7-col>
			<f7-col>
				<f7-button fill @click="cancelLogin">暂不登录</f7-button>
			</f7-col>
		</f7-row>
		<f7-block-footer>
			点击 <a href="/binding">注册</a> 申请一个新账号。
		</f7-block-footer>
	</f7-block>
	
</f7-page>

</template>

<script>
import axios from '../../../axios.js';

export default {
	name: 'login',
	data() {
		return {
			account: {
				name: '',
				password: ''
			}
		}
	},
	methods: {
		signIn() {
			this.$store.dispatch('signIn', this.account)
				.then(() => {
					this.$f7router.back();
				})
		},
		cancelLogin() {
			this.$f7router.navigate('/index/');
		}
	}
}
</script>


<style lang="less">
#login-page {
	div.col {
		text-align: center;
		margin: 1rem 0;
	}
	img {
		width: 100px;
	}
	.action-area {
		text-align: center;
	}
}
</style>
