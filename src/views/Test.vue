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

    <button type="button" @click="sendData">emit</button>

    <button class="btn btn-primary" type="submit">Submit</button>
  </Form>
</template>

<script>
import mitt from 'mitt'
const emitter = mitt()

export default {
  data () {
    return {
      user: {}
    }
  },
  methods: {
    onSubmit () {
      console.log(this.user)
    },
    sendData () {
      // fire an event
      emitter.emit('foo', { a: 'b' })
    }
  },
  created () {
    const instance = this.$http.create({
      baseURL: 'https://randomuser.me'
    })

    instance.get('/api/').then((response) => {
      console.log(response.data)
    })

    // listen to an event
    emitter.on('foo', e => console.log('foo: ', e))
  }
}
</script>
