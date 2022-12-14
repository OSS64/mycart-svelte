<script>
  import { Col, Row } from "sveltestrap";
  import { Router, Route, Link } from "svelte-routing";
  import Feedback from "../contact/feedback.svelte";
</script>

<body>
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
    <Row>
      <Col lg={{ size: 6, order: 2, offset: 3 }}>
        <Router>
          <Link to="feedback"
            ><h5>
              <strong>Please feel free to give feedback here</strong>
            </h5></Link
          >

          <Route path="feedback"><Feedback /></Route>
        </Router>
      </Col>
    </Row>
  </div>
</body>

<style>
  body {
    margin-top: 40px;
  }
  .container {
    margin-top: 40px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }
  h5 {
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 1);
    border-radius: 8px;
    text-align: center;
  }
  .feedbackForm {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    padding-top: 10px;
  }
  p {
    font-style: italic;
    text-align: center;
  }
  h2 {
    padding-bottom: 20px;
    text-align: center;
  }
  .address {
    padding-bottom: 20px;
    text-align: center;
  }
</style>
