<template>
	<v-app id="inspire">
		<v-main class="grey lighten-3">
			<v-sheet rounded="xl" class="wrap">
				<router-view></router-view>
			</v-sheet>
		</v-main>
	</v-app>
</template>

<script>
export default {
	name: "Auth"
};
</script>

<style scoped>
.wrap {
	max-width: 40vw;
	min-width: 700px;
	position: absolute;
	left: 50%;
	top: 50%;
	-webkit-transform: translate(-50%, -50%);
	-moz-transform: translate(-50%, -50%);
	-ms-transform: translate(-50%, -50%);
	-o-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);
    padding: 50px;
}

#inspire {
	position: relative;
}
</style>
