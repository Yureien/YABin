<script lang="ts">
    import { page } from '$app/stores';
</script>

<h1 class="text-2xl text-center mt-10">
    {$page.status}: {$page?.error?.message}
</h1>
