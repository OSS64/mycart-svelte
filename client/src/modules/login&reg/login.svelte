<script lang="ts">
  import { navigate, Link, Router } from "svelte-routing";
  import { Button, Form, FormGroup, Input } from "sveltestrap";
  import { callLoginApi } from "../../services/users.services";
  import Errormodal from "../../shared/utilities/errormodal.svelte";
  import { Utility } from "../../shared/utilities/utility";
  import { authStore } from "../../store/auth.store";
  import { classList } from "svelte-body";

  let email = "";
  let password = "";

  /**
   * Assign svelet reactive variable on the basis of email/password.
   * The value of these variable get changed with the change of
   * email/password field value.
   */
  $: isEmailInValid = Utility.isEmailInValid(email);
  $: isPasswordInValid = Utility.isPasswordInValid(password);

  let globalErrorMessage: string = "";

  /**
   * Used to pass data in login API
   */
  const loginData = {};

  /**
   * Clear interval, to stop memory leak.
   * Then navigate to login page.
   */
  const stopTimer = () => {
    displayErrorModal = false;
    navigate("/");
  };

  /**
   * props required to pass in ErrorModal
   */
  let displayErrorModal: boolean = false;
  let errorModalHeader: string = "Login API Response";
  let errorModalMessage: string;
  let showTimer: boolean = false;

  let closeErrorModal = () => {
    displayErrorModal = false;
    showTimer = false;
  };

  /**
   * Method is getting call after successful validation of login form.
   */
  const ajaxCall = async () => {
    let result = await callLoginApi(loginData);
    console.log(result);
    displayErrorModal = true;

    if (result.hasOwnProperty("user")) {
      errorModalMessage = "You have logged in successfully.";
      showTimer = true;
      Utility.setToken(result.user.token);
      const user = {
        email: result.user.email,
        password: loginData["password"],
        token: result.user.token,
      };
      Utility.setUser(user);
      authStore.set({
        isAuthenticated: true,
        user: user,
      });
    } else {
      errorModalMessage = `Error : ${result.message}`;
    }
  };

  /**
   * Validate login form, then submit the form if both the fields
   * have data within it.
   * @param e - submit event
   */
  export const onSubmit = (e: any) => {
    e.preventDefault();
    if (email.length === 0 && password.length === 0) {
      globalErrorMessage = "Fields are Empty";
      return;
    }
    if (email.length === 0) {
      globalErrorMessage = "Email is Empty";
      return;
    }
    if (password.length === 0) {
      globalErrorMessage = "Password is Empty";
      return;
    }
    if (email.length > 0 && password.length > 0) {
      globalErrorMessage = "";

      loginData["email"] = email;
      loginData["password"] = password;

      ajaxCall();
    }
    return false;
  };
</script>

<!-- <Body class="pg-login" /> -->
<svelte:body use:classList={"page-login"} />
<!-- {#if displayErrorModal}
  <Errormodal
    header={errorModalHeader}
    message={errorModalMessage}
    open={displayErrorModal}
    timer={showTimer}
    on:closeModal={closeErrorModal}
    on:endTimer={stopTimer}
  />
{/if} -->
<div class="px-page login-bg">
  <Form class="form">
    <h4 class="title">Welcome user!</h4>
    <p class="text-below">All fields are necessary.</p>
    {#if globalErrorMessage.length}
      <p class="text-danger">{globalErrorMessage}</p>
    {/if}
    <FormGroup class="username" floating label="Email">
      <Input
        type="email"
        bind:value={email}
        placeholder="Enter a value"
        invalid={isEmailInValid}
        feedback="Please enter a valid email"
      />
    </FormGroup>
    <FormGroup class="password" floating label="Password">
      <Input
        type="password"
        bind:value={password}
        invalid={isPasswordInValid}
        placeholder="Enter a value"
        feedback="Please enter a valid password"
      />
    </FormGroup>
    <Button type="button" on:click={onSubmit}>Login</Button><br />
    <Router>
      <Link to="/signup">Dont have an account? Signup here.</Link>
    </Router>
  </Form>
</div>

<style lang="scss">
  @import "./login.scss";
</style>
