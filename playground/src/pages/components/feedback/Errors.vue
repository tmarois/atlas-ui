<template>
  <section class="space-y-4">
    <Card>
      <template #content>
        <Errors :errors="['Email is required', 'Password must be at least 8 characters']" />
      </template>
    </Card>

    <Card>
      <template #content>
        <Errors
          :errors="{ name: 'Name is required', email: 'Email is invalid' }"
          title="Please fix the following:"
        />
      </template>
    </Card>

    <Card>
      <template #content>
        <Errors :failed="true" :expandDefault="false">
          <template #defaultError>
            <span>Something went wrong. Try again later.</span>
          </template>
        </Errors>
      </template>
    </Card>
  </section>
</template>

<script setup>
import Card from '@atlas/ui/components/Card.vue';
import Errors from '@atlas/ui/components/Errors.vue';
</script>

