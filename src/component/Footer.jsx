const Footer = () => {
    return (
      <footer className="bg-dark text-white py-4 mt-auto">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5>Anil Kumar</h5>
              <p className="mb-0">Sample Product List by Aliste Technologies</p>
            </div>
            <div className="col-md-6 text-md-end">
              <p className="mb-0">&copy; {new Date().getFullYear()} Anil Kumar. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  
  export default Footer
  