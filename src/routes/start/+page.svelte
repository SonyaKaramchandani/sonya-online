<script lang="ts">
	import Cursor from '$lib/components/Cursor.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import ClientIntakeForm from '$lib/components/ClientIntakeForm.svelte';
</script>

<svelte:head>
	<title>Sonya Karam | Start</title>
</svelte:head>

<Cursor />
<Header />
<main>
	<div id="page-container">
		<ClientIntakeForm />
	</div>
</main>
<Footer />
