const Filter = ({ filter }) => {
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={filter} />
    </div>
  );
};

export default Filter;
