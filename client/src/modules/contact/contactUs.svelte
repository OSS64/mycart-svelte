<script lang="ts">
  import { Col } from 'sveltestrap';
  import { Router, Route, Link } from 'svelte-routing';
  import Feedback from '../contact/feedback.svelte';
</script>

<div class="contact-body">
  <div class="main">
    <div class="container">
      <h2><strong>GET IN TOUCH</strong></h2>
      <p>Email: mycart1999@gmail.com</p>
      <p>Phone: 044 4561 4700</p>
      <p class="address">
        Address: Clove Embassy, Outer Ring Road, Bengaluru, 560103, Karnataka,
        India
      </p>
    </div>
    <div class="feedbackForm">
      <div>
        <Col
          lg="{{ size: 6, order: 2, offset: 3 }}"
          sm="{{ size: 8, offset: 2 }}"
          class="px-2"
        >
          <Router>
            <Link to="feedback"
              ><h5>
                <strong>Please feel free to give feedback here</strong>
              </h5></Link
            >
            <Route path="feedback"><Feedback /></Route>
          </Router>
        </Col>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import './contact.scss';
</style>
