<template>
  <q-layout>
    <q-page-container>
      <q-page class="outer-container">
        <div class="container">
          <div class="left-container">
            <h1>{{ title }}</h1>
            <p class="subtitle">Welcome to Feature Flag</p>
            <div :class="['form', isLogin ? 'login' : 'signup']">
              <slot name="form"></slot>
            </div>
            <div :class="['form-actions', isLogin ? 'login' : 'signup']">
              <p :class="['error-msg', showErrorMsg ? 'active' : '']">
                Please check your email and password
              </p>

              <q-btn
                no-caps
                rounded
                text-color="white"
                :class="['left-btn', isLogin ? 'login' : 'signup']"
                @click="$emit('executeMain')"
              >
                {{ mainBtnText }}
              </q-btn>
              <p
                v-if="action === 'login'"
                class="text-weight-medium secondary-link"
              >
                Forgot Password
              </p>
              <p
                v-if="action === 'login'"
                class="text-weight-medium secondary-link mobile-signup"
                @click="$router.push('/signup')"
              >
                Don't have an account? <span>Sign up</span>
              </p>
              <p
                v-else
                class="text-weight-medium secondary-link mobile-signup"
                @click="$router.push('/login')"
              >
                Already have an account? <span>Login</span>
              </p>
            </div>
          </div>
          <div class="right-container">
            <h1>Welcome to Feature Flag</h1>
            <p style="margin: 0">{{ secondarySubtitle }}</p>
            <q-btn
              no-caps
              rounded
              outline
              color="white"
              style="height: 40px"
              @click="$router.push(secondaryRedirection)"
            >
              {{ secondaryBtnText }}
            </q-btn>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
defineOptions({
  name: 'AuthenticationLayout',
});

interface Props {
  title: string;
  action: 'login' | 'sigup';
  showErrorMsg?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  showErrorMsg: false,
});
defineEmits(['executeMain']);

const isLogin = props.action === 'login';
const mainBtnText = isLogin ? 'Login' : 'Sign Up';
const secondaryBtnText = isLogin ? 'Sign Up' : 'Login';
const secondaryRedirection = isLogin ? '/signup' : '/login';
const secondarySubtitle = isLogin
  ? "Don't have an account?"
  : 'Already have an account?';
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

      .subtitle {
        display: none;
        margin-top: 12px;
        color: $primary;
        font-size: 16px;
        font-weight: bold;

        @media (width < 768px) {
          display: block;
        }
      }

      .form {
        margin-top: 36px;
        width: 100%;
        display: flex;
        flex-flow: column nowrap;

        &.login {
          gap: 24px;
        }

        &.signup {
          gap: 14px;
        }
      }

      .form-actions {
        &.login {
          margin-top: 12px;
        }

        .left-btn {
          &.login {
            margin-top: 12px;
          }
          width: 100%;
          height: 40px;
          background: rgb(55, 140, 231);
          background: linear-gradient(
            180deg,
            rgba(55, 140, 231, 1) 20%,
            rgba(103, 198, 227, 1) 100%
          );
        }

        .secondary-link {
          margin-top: 24px;
          color: $dark;
          cursor: pointer;
        }

        .mobile-signup {
          display: none;
          span {
            color: #378ce7;
          }

          @media (width < 768px) {
            display: block;
          }
        }

        .error-msg {
          color: $negative;
          margin: 0;
          opacity: 0;
          transition: opacity 0.3s ease;

          &.active {
            opacity: 100%;
          }
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
        display: none;
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
