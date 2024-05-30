<template>
  <authentication-layout title="Sign up" action="sigup" @executeMain="onSignup">
    <template #form>
      <q-input
        v-model="email"
        type="text"
        label="Email"
        filled
        input-style="font-size: 17px"
        :error="userAlreadyExists"
        :rules="[(val) => required(val), (val) => isEmailValid(val)]"
      >
        <template v-slot:append>
          <q-icon name="email" />
        </template>
      </q-input>

      <q-input
        v-model.trim="fullName"
        type="text"
        label="Full name / Company name"
        filled
        input-style="font-size: 17px"
        :rules="[(val) => required(val), (val) => minLength(val, 2)]"
      >
        <template v-slot:append>
          <q-icon name="account_circle" />
        </template>
      </q-input>

      <q-input
        v-model.trim="password"
        :type="showPassword ? 'text' : 'password'"
        label="Password"
        filled
        input-style="font-size: 17px"
        @keydown.enter="onSignup"
        :rules="[(val) => isPasswordValid(val)]"
      >
        <template v-slot:append>
          <q-icon
            :name="showPassword ? 'visibility' : 'visibility_off'"
            class="cursor-pointer"
            @click="showPassword = !showPassword"
          />
        </template>
      </q-input>
    </template>
  </authentication-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {
  destroyAuthentication,
  makeSignup,
} from 'src/helpers/authenticationHelper';
import { useRouter } from 'vue-router';
import AuthenticationLayout from 'layouts/AuthenticationLayout.vue';
import { showSnackbar } from 'src/utils/snackbar';
import { useAccountStore } from 'stores/account-store';
import {
  isEmailValid,
  isPasswordValid,
  minLength,
  required,
} from 'src/helpers/formValidationRules';
import SignupDTO from 'src/dto/authentication/SignupDTO';

defineOptions({
  name: 'SignupPage',
});

const router = useRouter();

const email = ref('');
const fullName = ref('');
const password = ref('');
const showPassword = ref(false);
const userAlreadyExists = ref(false);

const onSignup = async () => {
  const signupDTO: SignupDTO = {
    email: email.value,
    fullName: fullName.value,
    password: password.value,
  };
  try {
    userAlreadyExists.value = false;
    await makeSignup(signupDTO);
    const accountStore = useAccountStore();
    showSnackbar('success', `Welcome, ${accountStore.fullName}!`);
    await router.push('/home');
  } catch (e) {
    console.error(e);
    destroyAuthentication();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (e.response.status === 409) userAlreadyExists.value = true;
    showSnackbar('error', 'Please try with another email');
  }
};

onMounted(() => {
  if (new URLSearchParams(window.location.search).get('error')) {
    showSnackbar('error', 'Please login again');
  }
});
</script>
