<template>

<f7-page name="article">
	<f7-navbar title="文章" back-link></f7-navbar>

	<f7-block strong class="no-margin-top"> 
		<h3>{{article.title}}</h3>
		<f7-block-header>
			<span>{{article.created_at}}</span>
			<span>浏览:{{article.view}}</span>
			<f7-link :text="channel" class="margin-left" :href="`/channel/${this.channelId}`"></f7-link>
		</f7-block-header>
		<div v-html="article.content" class="article-content"></div>
	</f7-block>

	<f7-toolbar bottom-md>
		<f7-link
			:icon-f7="likeTag"
			@click="like"
			ref="like">
		</f7-link>
		<f7-link
			:icon-f7="collectTag"
			@click="collect"
			ref="collect">
		</f7-link>
		<f7-link icon-f7="forward"></f7-link>

	</f7-toolbar>

</f7-page>
</template>
<script>
import axios from '../../../axios.js';
import MarkdownIt from 'markdown-it';
import _ from 'lodash';
import dateFormat from 'dateformat';

const md = MarkdownIt({
	breaks: true
});

export default {
	data() {
		return {
			articleId: this.$f7Route.params.id,
			article: {
				title: '',
				content: '',
				created_at: '',
				view: ''
			},
			channelId: '',
			channel: '',
			likeTag: 'heart',
			collectTag: 'star'
		}
	},
	mounted() {
		this.getArticle().then(() => {

			this.getChannel();
		});
	},
	methods: {
		getArticle() {
			return axios.get(`app/article/${this.articleId}`).then(res => {
				
				const articleData = _.pick(res.data.data, [
					'title', 'content', 'created_at', 'view'
				]);

				this.channelId = res.data.data.channel;

				articleData.content = _.unescape(md.render(articleData.content))
				articleData.created_at = dateFormat(articleData.created_at, 'yyyy/mm/dd HH:MM');

				this.article = articleData;
			});
		},
		getChannel() {
			return axios.get(`app/channel/${this.channelId}`).then(res => {
				this.channel = res.data.data.name;
			});
		},
		collect() {
			if (this.collectTag === 'star') {
				return axios.post(`app/article/${this.articleId}/favorite`)
					.then(() => {
						this.collectTag = 'star_fill';
					})
					.catch(err => {
						console.log(err.message);
					});
			}
			if (this.collectTag === 'star_fill') {
				return axios.delete(`app/account/article/${this.articleId}/favorite`)
					.then(() => {
						this.collectTag = 'star';
					})
					.catch(err => {
						console.log(err.message);
					})
			}
		},
		like() {
			if (this.likeTag === 'heart') {
				return axios.post(`app/article/${this.articleId}/like`)
					.then(() => {
						this.likeTag = 'heart_fill';
					})
					.catch(err => {
						console.log(err.message);
					});
			}
			if (this.likeTag === 'heart_fill') {
				return axios.delete(`app/account/article/${this.articleId}/like`)
					.then(() => {
						this.likeTag = 'heart';
					})
					.catch(err => {
						console.log(err.message);
					});
			}
		}
	}
}
</script>

<style lang="less">
.article-content {
	img {
		width: 100%;
	}
	p {
		text-indent: 2em;
	}
}
</style>
