<template>
  <authentication-layout
    title="Login"
    action="login"
    :showErrorMsg="showErrorMsg"
    @executeMain="onLogin"
  >
    <template #form>
      <q-input
        v-model="email"
        type="text"
        label="Email"
        filled
        input-style="font-size: 17px"
      >
        <template v-slot:append>
          <q-icon name="email" />
        </template>
      </q-input>

      <q-input
        v-model.trim="password"
        :type="showPassword ? 'text' : 'password'"
        label="Password"
        filled
        input-style="font-size: 17px"
        @keydown.enter="onLogin"
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
import LoginDTO from 'src/dto/authentication/LoginDTO';
import {
  authenticate,
  destroyAuthentication,
} from 'src/helpers/authenticationHelper';
import { useRouter } from 'vue-router';
import AuthenticationLayout from 'layouts/AuthenticationLayout.vue';
import { showSnackbar } from 'src/utils/snackbar';
import { useAccountStore } from 'stores/account-store';

defineOptions({
  name: 'LoginPage',
});

const router = useRouter();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const showErrorMsg = ref(false);

const onLogin = async () => {
  const loginDTO: LoginDTO = {
    email: email.value,
    password: password.value,
  };
  try {
    await authenticate(loginDTO);
    const accountStore = useAccountStore();
    showSnackbar('success', `Welcome back, ${accountStore.fullName}!`);
    await router.push('/home');
  } catch (e) {
    console.error(e);
    destroyAuthentication();
    showErrorMsg.value = true;
  }
};

onMounted(() => {
  if (new URLSearchParams(window.location.search).get('error')) {
    showSnackbar('error', 'Please login again');
  }
});
</script>
