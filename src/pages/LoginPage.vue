<template>
  <q-layout>
    <q-page-container>
      <q-page class="outer-container">
        <div class="container">
          <div class="left-container">
            <h1>Sign In</h1>
            <div class="form">
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
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                filled
                input-style="font-size: 17px"
              >
                <template v-slot:append>
                  <q-icon
                    :name="showPassword ? 'visibility' : 'visibility_off'"
                    class="cursor-pointer"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </q-input>

              <transition name="fade">
                <p v-show="showErrorMsg" class="error-msg">
                  Please check your email and password
                </p>
              </transition>

              <q-btn
                no-caps
                rounded
                text-color="white"
                class="left-btn"
                @click="onLogin"
              >
                Sign In
              </q-btn>
              <p class="text-weight-medium forgot-pwd">Forgot Password</p>
            </div>
          </div>
          <div class="right-container">
            <h1>Welcome to Feature Flag</h1>
            <p>Don't have an account?</p>
            <q-btn
              no-caps
              rounded
              outline
              color="white"
              style="height: 40px"
              @click="$router.push('/signup')"
            >
              Sign Up
            </q-btn>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LoginDTO from 'src/dto/authentication/LoginDTO';
import { login } from 'src/services/authentication.service';
import { showSnackbar } from 'src/utils/snackbar';

defineOptions({
  name: 'LoginPage',
});

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const showErrorMsg = ref(false);

const onLogin = async () => {
  const loginDTO: LoginDTO = {
    email: email.value,
    password: password.value.trim(),
  };

  try {
    const response = await login(loginDTO);
    console.warn(response);
  } catch (e) {
    console.error(e);
    showErrorMsg.value = true;
    showSnackbar('success', 'Invalid email or password');
  }
};
</script>

<style scoped lang="scss">
.outer-container {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  .container {
    display: flex;
    flex-flow: row nowrap;
    width: 80%;
    height: 500px;
    box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;

    @media (width < 768px) {
      flex-flow: column nowrap;
      width: 100%;
      height: initial;
    }

    .left-container {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      text-align: center;
      width: 50%;
      background: $light;
      padding: 36px;

      @media (width < 768px) {
        height: 100vh;
        width: 100%;
        padding: 24px;
        text-align: center;
      }

      .form {
        margin-top: 36px;
        width: 100%;
        display: flex;
        flex-flow: column nowrap;
        gap: 24px;

        .left-btn {
          height: 40px;
          background: rgb(55, 140, 231);
          background: linear-gradient(
            180deg,
            rgba(55, 140, 231, 1) 20%,
            rgba(103, 198, 227, 1) 100%
          );
        }

        .forgot-pwd {
          color: $dark;
          cursor: pointer;
        }

        .error-msg {
          color: $negative;
          margin: 0;
        }
      }
    }

    .right-container {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: center;
      gap: 18px;
      width: 50%;
      background: rgb(83, 86, 255);
      background: linear-gradient(
        180deg,
        rgba(83, 86, 255, 1) 0%,
        rgba(55, 140, 231, 1) 35%,
        rgba(103, 198, 227, 1) 100%
      );

      @media (width < 768px) {
        width: 100%;
        height: 100vh;
      }

      h1,
      p {
        text-align: center;
        color: #fff;
      }

      h1 {
        font-size: 36px;
        font-weight: bold;
        letter-spacing: 1px;

        @media (width < 768px) {
          font-size: 28px;
        }
      }

      p {
        font-size: 20px;
      }
    }
  }
}
</style>
