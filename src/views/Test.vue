<template>
  <h1>this is test page</h1>

  <Form v-slot="{ errors, values }" @submit="onSubmit">
    {{ errors }} {{ values }}
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>

      <Field
        id="email"
        name="email"
        type="email"
        class="form-control"
        :class="{ 'is-invalid': errors['email'] }"
        placeholder="請輸入 Email"
        rules="email|required"
        v-model="user.email"
      ></Field>
      <error-message name="email" class="invalid-feedback"></error-message>
    </div>

    <button class="btn btn-primary" type="submit">Submit</button>
  </Form>
</template>

<script>
export default {
  data () {
    return {
      user: {}
    }
  },
  methods: {
    onSubmit () {
      console.log(this.user)
    }
  },
  created () {
    const instance = this.$http.create({
      baseURL: 'https://randomuser.me'
    })

    instance.get('/api/').then((response) => {
      console.log(response.data)
    })
  }
}
</script>
