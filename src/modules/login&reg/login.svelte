<script lang="ts">
    import { navigate, Link } from "svelte-routing";
    import { Button, Form, FormGroup, Input } from "sveltestrap";
    import { AppConstants } from "../../app-constants/app-config";
    import { Utility } from "../../shared/utilities/utility";
    import { authStore } from "../../store/auth.store";
    $: email = "";
    $: password = "";
    $: isEmailInValid = Utility.isEmailValid(email);
    $: isPasswordInValid = Utility.isPasswordValid(password);
    let globalErrorMessage: string = "";
    const onSubmit = (e: any) => {
        e.preventDefault();
        if (email !== AppConstants.defaultUser.email) {
            globalErrorMessage = "Email is not valid";
        } else if (password !== AppConstants.defaultUser.password) {
            globalErrorMessage = "Password is not valid";
        } else {
            globalErrorMessage = "";
            Utility.setToken(AppConstants.defaultUser.token);
            Utility.setUser(AppConstants.defaultUser);
            authStore.set({
                isAuthenticated: true,
                user: AppConstants.defaultUser,
            });
            navigate("/");
        }
    };
</script>

<div class="px-page login-bg">
    <small><p class="text-below">All fields are necessary.</p></small>
    <Form class="form">
        <!-- <small><p class="text-below">All fields are necessary.</p></small> -->
        <h4 class="title">Welcome user!</h4>
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
        <!-- <Button type="button" on:click={() => navigate("/signup")}
            >Register</Button
        > -->
        <!-- <div class="link-to-signup">
            <Link to="/signup">Dont have an account? Signup here.</Link>
        </div> -->
    </Form>
    <div class="link-to-signup">
        <Link to="/signup">Dont have an account? Signup here.</Link>
    </div>
</div>

<style lang="scss">
    .link-to-signup {
        text-align: center;
    }
    .title {
        text-align: center;
        margin-bottom: 20px;
        font-size: 22px;
    }
    .px-page {
        height: 100vh;
        width: 100vw;
        display: grid;
        align-items: center;
        justify-content: center;
    }
    :global(.form) {
        min-width: 450px;
        background: #fff;
        box-shadow: 0 0 10px rgb(0, 0, 0);
        text-align: center;
        padding: 50px 20px;
        border-radius: 10px;
    }
    .text-danger {
        color: red;
    }
    .text-below {
        // align-items: flex-end;
        font-size: 10px;
        color: #fff;
        text-align: center;
    }
    .px-page.login-bg {
        background-image: url("./../content/images/login-bg-img.avif");
        background-size: cover;
        background-position: left bottom;
        position: relative;
        z-index: 1;
    }
    .px-page.login-bg:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
        background: #000;
        z-index: -1;
        opacity: 0.7;
    }
</style>
