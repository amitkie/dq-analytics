import React, { useEffect, useState } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import SideBar from "../../components/sidebar/SideBar";
import Modal from "react-bootstrap/Modal";
import ButtonComponent from "../../common/button/button";
import { AiOutlinePlus } from "react-icons/ai";
import InputComponent from "../../common/input/input";
import TableComponent from "../../components/tableComponent/TableComponent";
import Table from "react-bootstrap/Table";

import "./workSpace.scss";
import { getAllBrands, getAllCategories, getAllPlatforms } from "../../services/userService";
import MultiSelectDropdown from "../../components/MultiSelectDropdown/MultiSelectDropdown";

export default function WorkSpace() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getAllCategories();
        setCategories(categoriesData.data.map(cat => ({
          value: cat.id,
          label: cat.name
        })));

        const brandsData = await getAllBrands();
        setBrands(brandsData.data.map(brand => ({
          value: brand.id,
          label: brand.name
        })));

        const platformsData = await getAllPlatforms();
        setPlatforms(platformsData.data.map(platform => ({
          value: platform.id,
          label: platform.name
        })));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
  };

  const handleBrandChange = (selectedOptions) => {
    setSelectedBrands(selectedOptions);
  };

  const handlePlatformChange = (selectedOptions) => {
    setSelectedPlatforms(selectedOptions);
  };

  return (
    <>
      <div className="row g-0">
        <div className="col-1">
          <SideBar />
        </div>
        <div className="col-11">
          <div className="workspace-container">
            <h2 className="page-title mt-4 ml-3">Workspace</h2>
            <button type="button" class="create-workspace" onClick={handleShow}>
              <AiOutlinePlus className="create-workspace-icon" /> Create Project
            </button>
            <Modal
              size="xl"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={show}
              onHide={handleClose}
              className="modal-height"
            >
              <Modal.Header closeButton>
                <Modal.Title>Create Project</Modal.Title>
              </Modal.Header>
              <Modal.Body className="pb-5">
                <div className="project-name mb-4">
                  <InputComponent
                    id={"userEmail"}
                    inputLabel={"Project Name"}
                    inputType={"email"}
                    placeholder={"Digital Assessment"}
                  />
                </div>
                <div className="select-options-container">
                  <small>*All fields are mandatory</small>
                  <div className="row mb-4">
                    <div className="col">
                      {/* <select className="Select-input" name="category">
                        <option value="Select Category">Select Category</option>
                        <option value="Beauty">Beauty</option>
                        <option value="haircare">Hair care</option>
                        <option value="food">Food</option>
                        <option value="baby">Baby</option>
                        <option value="Male grooming">Male Grooming</option>
                      </select> */}
                      <MultiSelectDropdown
                        options={categories}
                        selectedValues={selectedCategories}
                        onChange={handleCategoryChange}
                        placeholder="Select Categories"
                      />
                    </div>
                    <div className="col">
                      <select className="Select-input" name="brands">
                        <option value="Select Brands">Select Brands</option>
                        <option value="Himalaya">Himalaya</option>
                        <option value="Palmolive">Palmolive</option>
                        <option value="Lux">Lux</option>
                        <option value="Parachute">Parachute</option>
                        <option value="Pears">Pears</option>
                      </select>
                    </div>
                    <div className="col">
                      <select className="Select-input" name="platform">
                        <option value="Select Platform/Sectional wise">
                          Select Platform/Sectional wise
                        </option>
                        <option value="Social">Social</option>
                        <option value="Ecom">Ecom</option>
                        <option value="Paid">Paid</option>
                        <option value="Brand Perf">Brand Perf</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col">
                      <select className="Select-input" name="metrics">
                        <option value="Select metrics">Select Metrics</option>
                        <option value="Beauty">Beauty</option>
                        <option value="haircare">Hair care</option>
                        <option value="food">Food</option>
                        <option value="baby">Baby</option>
                        <option value="Male grooming">Male Grooming</option>
                      </select>
                    </div>
                    <div className="col">
                      <select className="Select-input" name="frequency">
                        <option value="Select frequency">
                          Select Frequency
                        </option>
                        <option value="Monthly">Monthly</option>
                        <option value="Quarterly">Quarterly</option>
                        <option value="Annually">Annually</option>
                      </select>
                    </div>
                    <div className="col">
                      <span className="daterange">Date Range</span>
                      {/* <DateRangePicker
                        initialSettings={{ showDropdowns: true }}
                      >
                        61 <input type="text" className="form-control col-4" />
                        62{" "}
                      </DateRangePicker> */}
                    </div>
                  </div>
                  {/* <div className="row mb-4">
                    <div className="col">
                      <select className="Select-input" name="benchmarks">
                        <option value="Select benchmarks">
                          Select Benchmarks
                        </option>
                        <option value="50">50</option>
                        <option value="60">60</option>
                        <option value="70">70</option>
                        <option value="80">80</option>
                        <option value="90above">90 and above</option>
                      </select>
                    </div>
                  </div> */}
                </div>
              </Modal.Body>
              <Modal.Footer className="d-flex justify-content-between">
                <ButtonComponent
                  btnClass={"btn-outline-secondary"}
                  btnName={"Cancel"}
                  onClick={handleClose}
                />
                <ButtonComponent
                  btnClass={"btn-primary px-4"}
                  btnName={"Save"}
                  onClick={handleClose}
                />
              </Modal.Footer>
            </Modal>
            <div className="project-table-data mt-5">
              <Table responsive striped bordered>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Project Name</th>
                    <th>Category</th>
                    <th>Date Range</th>
                    <th>Frequency</th>
                    <th>Last modified on</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Digital Assessment - 1</td>
                    <td>Beauty</td>
                    <td>Monthly</td>
                    <td></td>
                    <td>22 May, 2024</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Digital Assessment - 1</td>
                    <td>Beauty</td>
                    <td>Monthly</td>
                    <td></td>
                    <td>22 May, 2024</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>Digital Assessment - 1</td>
                    <td>Beauty</td>
                    <td>Monthly</td>
                    <td></td>
                    <td>22 May, 2024</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            {/* <div className="footer-button">
              <ButtonComponent
                btnClass={"btn-outline-secondary"}
                btnName={"Back"}
              />
              <ButtonComponent
                btnClass={"btn-primary"}
                btnName={"Go to Analytics"}
              />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
