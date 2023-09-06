import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';

import App from './App';

import * as API from './api/index';

const USERS = [{
  "name": {
      "first": "TEST_NAME_1",
      "last": "TEST_LASTNAME_1"
  },
  "location": {
      "country": "United Kingdom",
  },
  "id": {
      "name": "NINO",
      "value": "GY 82 86 90 M"
  },
  "picture": {
      "thumbnail": "https://randomuser.me/api/portraits/thumb/men/1.jpg"
  }
},{
  "name": {
      "first": "TEST_NAME_2",
      "last": "TEST_LASTNAME_2"
  },
  "location": {
      "country": "Brazil",
  },
  "id": {
      "name": "CPF",
      "value": "019.335.570-26"
  },
  "picture": {
      "thumbnail": "https://randomuser.me/api/portraits/thumb/women/68.jpg"
  }
}]

jest.mock('./api/index', () => ({
  fetchUsers: jest.fn().mockResolvedValue(USERS),
}));

describe("Renders challenge", () => {
  it("Should render app", async () => {
    const AMOUNT_OF_BUTTONS = 3;
    render(<App/>);

    expect(screen.getByText(/technical test/i)).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toBe(AMOUNT_OF_BUTTONS);
    expect(screen.getByRole('button',{ name: /color row/i })).toBeInTheDocument();
    expect(screen.getByRole('button',{ name: /sort by country/i })).toBeInTheDocument();
    expect(screen.getByRole('button',{ name: /reset state/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    
    expect(API.fetchUsers).toHaveBeenCalledTimes(1);
    expect((await screen.findAllByText(/TEST_NAME/i)).length).toBe(2);
  });
});

describe("When clicking on button...", () => {
  it("Color Row should change color of each table's row", async() => {
    const defaultClass = "odd:bg-white even:bg-slate-50";
    const coloredClass = "odd:bg-amber-50 even:bg-amber-100"
    render(<App/>);

    expect((await screen.findAllByText(/TEST_NAME/i)).length).toBe(2);
    const colorButton = screen.getByText(/color/i);
    const tableRows  = screen.getAllByTestId(/table-row/i);
    expect(tableRows[0].className.includes(defaultClass)).toBeTruthy();
    fireEvent.click(colorButton);
    expect(tableRows[0].className.includes(coloredClass)).toBeTruthy();

    const sortButton = screen.getByText(/sort by country/i);
    let users = screen.getAllByText(/TEST_NAME/i);
    expect(users[0].textContent).toBe('TEST_NAME_1');
    expect(users[1].textContent).toBe('TEST_NAME_2');
    fireEvent.click(sortButton);
    users = screen.getAllByText(/TEST_NAME/i);
    expect(users[0].textContent).toBe('TEST_NAME_2');
    expect(users[1].textContent).toBe('TEST_NAME_1');
  });

  it("Sort By Country should sort by country", async() => {
    render(<App/>);
    
    expect((await screen.findAllByText(/TEST_NAME/i)).length).toBe(2);
    
    const sortButton = screen.getByText(/sort by country/i);
    let users = screen.getAllByText(/TEST_NAME/i);
    expect(users[0].textContent).toBe('TEST_NAME_1');
    expect(users[1].textContent).toBe('TEST_NAME_2');
    fireEvent.click(sortButton);
    users = screen.getAllByText(/TEST_NAME/i);
    expect(users[0].textContent).toBe('TEST_NAME_2');
    expect(users[1].textContent).toBe('TEST_NAME_1');
        
    // screen.debug()
  });

  it("Reset State should clear all filters", async () => {
    const defaultClass = "odd:bg-white even:bg-slate-50";
    
    render(<App/>);
    expect((await screen.findAllByText(/TEST_NAME/i)).length).toBe(2);
    
    const colorButton = screen.getByText(/color/i);
    fireEvent.click(colorButton);

    const sortButton = screen.getByText(/sort by country/i);
    fireEvent.click(sortButton);

    const resetButton = screen.getByText(/reset/i);
    fireEvent.click(resetButton);

    const tableRows  = screen.getAllByTestId(/table-row/i);
    expect(tableRows[0].className.includes(defaultClass)).toBeTruthy();
    let users = screen.getAllByText(/TEST_NAME/i);
    expect(users[0].textContent).toBe('TEST_NAME_1');
    expect(users[1].textContent).toBe('TEST_NAME_2');

  });

  it("Delete should delete user from table", async() => {
    render(<App />);

    expect((await screen.findAllByText(/TEST_NAME/i)).length).toBe(2);
    const deleteButton = screen.getAllByText(/delete/i);
    fireEvent.click(deleteButton[0]);

    expect((await screen.findAllByText(/TEST_NAME/i)).length).toBe(1);
  })
});

describe("Should filter by country", () => {
  it("Enters one country and should display one user", async() => {
    render(<App/>);

    expect((await screen.findAllByText(/TEST_NAME/i)).length).toBe(2);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, {target : { value : "brazil" }});

    expect((screen.getAllByText(/TEST_NAME/i)).length).toBe(1);
  });

  it("Enter a non existing country and should display no users", async () => {
    render(<App />);

    expect((await screen.findAllByText(/TEST_NAME/i)).length).toBe(2);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, {target : { value : "nocountry" }});

    expect((screen.queryAllByText(/TEST_NAME/i)).length).toBe(0);
  });

  it("Should be reset when clicking reset button", async () => {
    const INPUT_VALUE = "blahblah";
    render(<App />);
    expect((await screen.findAllByText(/TEST_NAME/i)).length).toBe(2);

    const input = screen.getByLabelText('filter-input') as HTMLInputElement;
    fireEvent.change(input, {target : { value : INPUT_VALUE }});
    expect(input.value).toBe(INPUT_VALUE);

    fireEvent.click(screen.getByText(/reset/i));

    expect(input.value).toBe("");
  })
});